// Import React
import { useEffect } from 'react';

// Import components
import { alert, confirm } from '../components/AppWrapper';

// Import types
import BackState from '../types/BackState';
import BackButtonController from '../types/BackButtonController';

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Marker stored on history entries owned by this hook
const HISTORY_STATE_MARKER = { dceReactkitBackButton: true };

// Default message shown when the user tries to go back while blocked
const BLOCKED_TITLE = 'Cannot Go Back';
const BLOCKED_MESSAGE = 'We are currently working. Please try again in a moment.';

// Default message shown when the user tries to go back with unsaved changes
const UNSAVED_CHANGES_TITLE = 'Abandon Changes?';
const UNSAVED_CHANGES_MESSAGE = 'Your current progress will be lost.';

/*------------------------------------------------------------------------*/
/* --------------------------- Static State ----------------------------- */
/*------------------------------------------------------------------------*/

// Handler that performs the app state changes required to return home
let handleGoHome: (() => void) | undefined;

// State of the subpanel the user is currently in
let currentSubpanelState: BackState = BackState.Normal;

// Custom messages for the current subpanel (cleared upon returning home)
let customUnsavedChangesMessage: string | undefined;
let customBlockedMessage: string | undefined;

// True if the user is currently in a subpanel (one level deep from home)
let inSubpanel = false;

// True if the next back navigation was triggered by us and must pass through
// without being intercepted
let bypassNextPop = false;

// True while a confirmation/alert is on screen, so repeated back presses don't
// stack up duplicate prompts
let promptVisible = false;

/*------------------------------------------------------------------------*/
/* ------------------------- Helper Functions --------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Throw if the hook hasn't been set up yet
 * @author Yuen Ler Chow
 */
const requireSetup = () => {
  if (!handleGoHome) {
    throw new Error('The back button is not set up yet: call useBackButton in your top-level app before using backButtonController.');
  }
};

/**
 * Return to the home screen: reset all subpanel state and run the app's
 *   go-home handler
 * @author Yuen Ler Chow
 * @param consumeHistoryEntry if true, also step back over the history entry
 *   that was added when the subpanel was entered. Pass false when the entry has
 *   already been consumed (e.g. the user pressed the browser back button)
 */
const returnHome = (consumeHistoryEntry: boolean) => {
  const hadHistoryEntry = inSubpanel;

  // Reset subpanel state
  inSubpanel = false;
  currentSubpanelState = BackState.Normal;
  customUnsavedChangesMessage = undefined;
  customBlockedMessage = undefined;

  // Update the app
  handleGoHome?.();

  // Consume the mirrored history entry
  if (consumeHistoryEntry && hadHistoryEntry) {
    bypassNextPop = true;
    window.history.back();
  }
};

/**
 * Undo a back navigation that we don't want to allow, keeping the user in
 *   place. The browser's popstate event cannot be canceled, so we immediately
 *   push a replacement entry instead. Must be called synchronously while
 *   handling the pop.
 * @author Yuen Ler Chow
 */
const undoPop = () => {
  window.history.pushState(HISTORY_STATE_MARKER, '');
};

/**
 * Tell the user they cannot go back right now
 * @author Yuen Ler Chow
 */
const showBlockedMessage = async () => {
  promptVisible = true;
  await alert(
    BLOCKED_TITLE,
    customBlockedMessage ?? BLOCKED_MESSAGE,
  );
  promptVisible = false;
};

/**
 * Ask the user whether they want to leave despite unsaved changes
 * @author Yuen Ler Chow
 * @returns true if the user wants to leave
 */
const askToAbandonChanges = async (): Promise<boolean> => {
  promptVisible = true;
  const confirmed = await confirm(
    UNSAVED_CHANGES_TITLE,
    customUnsavedChangesMessage ?? UNSAVED_CHANGES_MESSAGE,
    {
      confirmButtonText: 'Abandon Changes',
      cancelButtonText: 'Stay Here',
    },
  );
  promptVisible = false;
  return confirmed;
};

/**
 * Handle a browser back navigation
 * @author Yuen Ler Chow
 */
const handlePopState = () => {
  // Back navigation that we triggered ourselves: let it through
  if (bypassNextPop) {
    bypassNextPop = false;
    return;
  }

  // Not in a subpanel: nothing for us to intercept
  if (!inSubpanel) {
    return;
  }

  // A prompt is already on screen: stay put and don't stack another one
  if (promptVisible) {
    undoPop();
    return;
  }

  // Blocked: stay put and explain why
  if (currentSubpanelState === BackState.Blocked) {
    undoPop();
    showBlockedMessage();
    return;
  }

  // Unsaved changes: stay put until the user confirms. Note that the pop must
  // be undone synchronously, before awaiting the confirmation
  if (currentSubpanelState === BackState.UnsavedChanges) {
    undoPop();
    (async () => {
      if (await askToAbandonChanges()) {
        returnHome(true);
      }
    })();
    return;
  }

  // Normal: allow it. The history entry was already consumed by this pop
  returnHome(false);
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Controller ---------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Controller for driving back navigation from anywhere in the app. Requires
 *   useBackButton to have been called in the top-level app.
 * @author Yuen Ler Chow
 */
export const backButtonController: BackButtonController = {
  onSubpanelEntered: () => {
    requireSetup();
    inSubpanel = true;
    currentSubpanelState = BackState.Normal;
    window.history.pushState(HISTORY_STATE_MARKER, '');
  },
  goHome: async (force?: boolean) => {
    requireSetup();

    // Check whether the user is allowed to leave right now
    if (!force) {
      if (promptVisible) {
        return;
      }
      if (currentSubpanelState === BackState.Blocked) {
        await showBlockedMessage();
        return;
      }
      if (currentSubpanelState === BackState.UnsavedChanges) {
        if (!(await askToAbandonChanges())) {
          return;
        }
      }
    }

    returnHome(true);
  },
  setSubpanelState: (newSubpanelState: BackState) => {
    currentSubpanelState = newSubpanelState;
  },
  setCustomUnsavedChangesMessage: (message: string) => {
    customUnsavedChangesMessage = message;
  },
  setCustomBlockedMessage: (message: string) => {
    customBlockedMessage = message;
  },
};

/*------------------------------------------------------------------------*/
/* --------------------------------- Hook ------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Hook that makes the browser's back button navigate within the app instead of
 *   leaving it. Call this once in your top-level app, then use
 *   backButtonController to enter subpanels and describe their state.
 *
 * Assumes a single level of navigation: one home screen plus subpanels that the
 *   user returns home from.
 * @author Yuen Ler Chow
 * @param handleGoHomeFunc handler that performs the app state changes required
 *   to return to the home screen
 */
const useBackButton = (handleGoHomeFunc: () => void) => {
  // Keep the handler up to date so the listener never calls a stale version
  handleGoHome = handleGoHomeFunc;

  useEffect(
    () => {
      // Mark the current entry as the home entry
      window.history.replaceState(HISTORY_STATE_MARKER, '');

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);

        // Reset static state so a remount starts clean
        handleGoHome = undefined;
        currentSubpanelState = BackState.Normal;
        customUnsavedChangesMessage = undefined;
        customBlockedMessage = undefined;
        inSubpanel = false;
        bypassNextPop = false;
        promptVisible = false;
      };
    },
    [],
  );
};

export default useBackButton;
