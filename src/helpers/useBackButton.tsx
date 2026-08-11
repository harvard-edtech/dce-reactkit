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
const HISTORY_STATE_MARKER = { dceReactKitBackButton: true };

// Default message shown when the user tries to go back while blocked
const BLOCKED_TITLE = 'Cannot Go Back';
const BLOCKED_MESSAGE = 'A task is currently in progress. Please try again once it finishes.';

// Default message shown when the user tries to go back with unsaved changes
const UNSAVED_CHANGES_TITLE = 'Abandon Changes?';
const UNSAVED_CHANGES_MESSAGE = 'Any unsaved changes may be lost.';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * All state for the back button, kept in one place because the pieces are
 *   interdependent. A subpanel's back state and its custom messages only have
 *   meaning while the user is inside a subpanel, so they are nested within it:
 *   returning home is then a single change (dropping the subpanel) that cannot
 *   leave a stale message or back state behind
 * @author Yuen Ler Chow
 */
type BackButtonState = {
  // Handler that performs the app state changes required to return to the home
  // screen. Undefined until useBackButton has been called
  handleGoHome?: () => void,
  // The subpanel the user is currently in. Undefined while on the home screen
  subpanel?: {
    // What should happen when the user tries to go back
    backState: BackState,
    // Message shown when confirming that unsaved changes will be lost
    customUnsavedChangesMessage?: string,
    // Message shown when the user tries to go back while blocked
    customBlockedMessage?: string,
  },
  // True while a prompt is on screen, so that repeated back presses don't stack
  // up duplicate prompts
  promptVisible: boolean,
  // True if the next back navigation was triggered by us and must pass through
  // without being intercepted
  bypassNextPop: boolean,
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static State ----------------------------- */
/*------------------------------------------------------------------------*/

// Current state, stored statically so that any subpanel can drive the back
// button without prop drilling or context
let state: BackButtonState = {
  promptVisible: false,
  bypassNextPop: false,
};

/*------------------------------------------------------------------------*/
/* ------------------------- Helper Functions --------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Get the app's go-home handler, throwing if the hook has not been set up yet
 * @author Yuen Ler Chow
 * @returns handler that returns the app to its home screen
 */
const getHandleGoHome = (): () => void => {
  if (!state.handleGoHome) {
    throw new Error('Cannot use the back button: call useBackButton in your top-level app before using backButtonController.');
  }
  return state.handleGoHome;
};

/**
 * Return to the home screen: clear the current subpanel and run the app's
 *   go-home handler
 * @author Yuen Ler Chow
 * @param consumeHistoryEntry if true, also step back over the history entry
 *   that was added when the subpanel was entered
 */
const returnHome = (consumeHistoryEntry: boolean) => {
  const handleGoHome = getHandleGoHome();
  const wasInSubpanel = !!state.subpanel;

  // Dropping the subpanel clears its back state and custom messages at once
  state.subpanel = undefined;

  // Update the app
  handleGoHome();

  // Entering a subpanel added a history entry. When the user leaves via an
  // in-app control, that entry is still on the stack, so we step over it to keep
  // the browser history in sync with the app. When the browser's back button is
  // what brought us here, that entry has already been consumed by the browser,
  // and stepping back again would take the user out of the app entirely
  if (consumeHistoryEntry && wasInSubpanel) {
    state.bypassNextPop = true;
    window.history.back();
  }
};

/**
 * Keep the user in place after a back navigation that should not be allowed.
 *   The browser's popstate event is not cancelable, so the only way to stay put
 *   is to immediately push a new entry to replace the one that was just popped.
 *   This has to happen synchronously while handling the pop, before awaiting
 *   anything, otherwise the navigation has already taken effect
 * @author Yuen Ler Chow
 */
const undoPop = () => {
  window.history.pushState(HISTORY_STATE_MARKER, '');
};

/**
 * Tell the user that they cannot go back right now
 * @author Yuen Ler Chow
 */
const showBlockedMessage = async () => {
  state.promptVisible = true;
  await alert(
    BLOCKED_TITLE,
    state.subpanel?.customBlockedMessage ?? BLOCKED_MESSAGE,
  );
  state.promptVisible = false;
};

/**
 * Ask the user whether they want to leave despite having unsaved changes
 * @author Yuen Ler Chow
 * @returns true if the user wants to leave
 */
const askToAbandonChanges = async (): Promise<boolean> => {
  state.promptVisible = true;
  const confirmed = await confirm(
    UNSAVED_CHANGES_TITLE,
    state.subpanel?.customUnsavedChangesMessage ?? UNSAVED_CHANGES_MESSAGE,
    {
      confirmButtonText: 'Abandon Changes',
      cancelButtonText: 'Stay Here',
    },
  );
  state.promptVisible = false;
  return confirmed;
};

/**
 * Handle a back navigation performed by the browser
 * @author Yuen Ler Chow
 */
const handlePopState = () => {
  // Back navigation that we triggered ourselves: let it through
  if (state.bypassNextPop) {
    state.bypassNextPop = false;
    return;
  }

  // Already on the home screen: nothing for us to intercept
  if (!state.subpanel) {
    return;
  }

  // A prompt is already on screen: stay put instead of stacking another one
  if (state.promptVisible) {
    undoPop();
    return;
  }

  // Blocked: stay put and explain why
  if (state.subpanel.backState === BackState.Blocked) {
    undoPop();
    showBlockedMessage();
    return;
  }

  // Unsaved changes: stay put until the user confirms. The pop is undone
  // synchronously here, before awaiting the confirmation, so that the user
  // remains in the subpanel while they decide
  if (state.subpanel.backState === BackState.UnsavedChanges) {
    undoPop();
    (async () => {
      if (await askToAbandonChanges()) {
        returnHome(true);
      }
    })();
    return;
  }

  // Normal: allow it. The browser already consumed the history entry, so there
  // is nothing left for us to step over
  returnHome(false);
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Controller ---------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Controller for driving back navigation from anywhere in the app. Requires
 *   useBackButton to have been called in the top-level app
 * @author Yuen Ler Chow
 */
export const backButtonController: BackButtonController = {
  /**
   * Call this when the user navigates to a child of the home screen (something
   *   they can come back from)
   * @author Yuen Ler Chow
   */
  onSubpanelEntered: () => {
    getHandleGoHome();

    state.subpanel = {
      backState: BackState.Normal,
    };

    // Add a history entry to come back to, so that the next back navigation is
    // intercepted instead of leaving the app
    window.history.pushState(HISTORY_STATE_MARKER, '');
  },

  /**
   * Send the user back to the home screen
   * @author Yuen Ler Chow
   * @param [force] if true, go home immediately without checking the subpanel
   *   state. If falsy, nothing happens while blocked and confirmation is
   *   required when there are unsaved changes
   */
  goHome: async (force?: boolean) => {
    getHandleGoHome();

    // Unless the caller is forcing the navigation, the subpanel's state decides
    // whether the user may leave: a blocked subpanel refuses and explains why,
    // and one with unsaved changes leaves only if the user confirms
    if (!force) {
      // A prompt is already asking the user this same question
      if (state.promptVisible) {
        return;
      }

      if (state.subpanel?.backState === BackState.Blocked) {
        await showBlockedMessage();
        return;
      }

      if (state.subpanel?.backState === BackState.UnsavedChanges) {
        const confirmed = await askToAbandonChanges();
        if (!confirmed) {
          return;
        }
      }
    }

    returnHome(true);
  },

  /**
   * Set the state of the current subpanel, which determines what happens when
   *   the user tries to go back. Ignored while on the home screen, where there
   *   is no back navigation to describe
   * @author Yuen Ler Chow
   * @param newSubpanelState the new state of the subpanel
   */
  setSubpanelState: (newSubpanelState: BackState) => {
    if (!state.subpanel) {
      return;
    }
    state.subpanel.backState = newSubpanelState;
  },

  /**
   * Set the confirmation message shown if the user tries to go back while there
   *   are unsaved changes. Cleared upon returning to the home screen
   * @author Yuen Ler Chow
   * @param message the message to show
   */
  setCustomUnsavedChangesMessage: (message: string) => {
    if (!state.subpanel) {
      return;
    }
    state.subpanel.customUnsavedChangesMessage = message;
  },

  /**
   * Set the message shown if the user tries to go back while blocked. Cleared
   *   upon returning to the home screen
   * @author Yuen Ler Chow
   * @param message the message to show
   */
  setCustomBlockedMessage: (message: string) => {
    if (!state.subpanel) {
      return;
    }
    state.subpanel.customBlockedMessage = message;
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
  // Store the handler on every render so that the listener below, which is only
  // registered once, always calls the app's current version of it
  state.handleGoHome = handleGoHomeFunc;

  // The popstate listener has to be attached to the window, which is outside of
  // React, so an effect is used to add it when the app mounts and remove it if
  // the app ever unmounts. The empty dependency array keeps this to a single
  // listener for the lifetime of the app instead of one per render
  useEffect(
    () => {
      // Mark the current entry as the home entry
      window.history.replaceState(HISTORY_STATE_MARKER, '');

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);

        // Clear the static state so that a remount starts from scratch
        state = {
          promptVisible: false,
          bypassNextPop: false,
        };
      };
    },
    [],
  );
};

export default useBackButton;
