// Import React
import { useEffect, useRef, useCallback } from 'react';

// Marker stored on history entries owned by this hook
const HISTORY_STATE_MARKER = { dceReactkitBackGuard: true };

/**
 * Hook for intercepting the browser's back button (and mapping an in-app back
 *   button to it) without a router. Mirrors app "depth" into the browser
 *   history so that a native back navigation runs through a single guard
 *   handler that can allow the navigation or block it (stay in place, e.g. to
 *   show a confirmation prompt first).
 *
 * Because the browser's "popstate" event cannot be canceled, blocking is
 *   implemented by immediately pushing a replacement history entry to undo the
 *   pop. All of that bookkeeping is handled internally. Intended to be used
 *   once, near the root of an app.
 * @author Yuen Ler Chow
 * @param onBackAttempt handler called when the user attempts to navigate back
 *   (via the browser back button or requestBack): inspect current app state,
 *   perform any state updates needed to navigate, and return true to allow the
 *   back navigation or false to block it and stay in place (e.g. because a
 *   confirmation prompt is now showing)
 * @returns helpers for mirroring navigation into browser history: enterNewScreen
 *   (call when navigating one level deeper so a subsequent back is
 *   intercepted), requestBack (guarded back, the same path as the browser back
 *   button), and goBack (programmatically navigate back without triggering the
 *   guard, e.g. after the user confirms leaving)
 */
const useBrowserBackButton = (
  onBackAttempt: () => boolean,
): {
    enterNewScreen: () => void,
    requestBack: () => void,
    goBack: () => void,
  } => {
  /* -------------- Refs -------------- */

  // Keep the latest handler in a ref so the once-registered popstate listener
  // always calls the current version (never a stale closure)
  const onBackAttemptRef = useRef<() => boolean>(onBackAttempt);
  onBackAttemptRef.current = onBackAttempt;

  // When true, the next back navigation is programmatic (from goBack) and must
  // pass through without invoking the guard handler
  const bypassRef = useRef<boolean>(false);

  /* ------------- Helpers ------------ */

  // Enter a new screen (navigate one level deeper), mirroring it in browser
  // history so a subsequent back navigation is intercepted by the guard. Call
  // this alongside the state update that shows the new screen.
  const enterNewScreen = useCallback(() => {
    window.history.pushState(HISTORY_STATE_MARKER, '');
  }, []);

  // Request a back navigation that runs through the guard handler (same path as
  // the browser back button). Use this for your own in-app back buttons so they
  // share a single code path with the browser back button.
  const requestBack = useCallback(() => {
    window.history.back();
  }, []);

  // Programmatically navigate back without triggering the guard handler. Use
  // this once the app has already decided to leave (e.g. after the user
  // confirms abandoning changes) so the mirrored history entry is consumed.
  const goBack = useCallback(() => {
    bypassRef.current = true;
    window.history.back();
  }, []);

  /* ------------- Listener ------------ */

  useEffect(
    () => {
      // Mark the current entry as this hook's base entry
      window.history.replaceState(HISTORY_STATE_MARKER, '');

      // Handle a browser back navigation
      const handlePopState = () => {
        // Programmatic back (from goBack): swallow it, the app already updated
        // its own state
        if (bypassRef.current) {
          bypassRef.current = false;
          return;
        }

        // Ask the app what to do; default to allowing the navigation
        const allowBack = onBackAttemptRef.current();

        // Block by re-pushing an entry to undo the pop (popstate can't be
        // canceled), keeping the user in place
        if (!allowBack) {
          window.history.pushState(HISTORY_STATE_MARKER, '');
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    },
    [],
  );

  return {
    enterNewScreen,
    requestBack,
    goBack,
  };
};

export default useBrowserBackButton;
