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
declare const useBrowserBackButton: (onBackAttempt: () => boolean) => {
    enterNewScreen: () => void;
    requestBack: () => void;
    goBack: () => void;
};
export default useBrowserBackButton;
