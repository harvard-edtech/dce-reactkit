import BackButtonController from '../types/BackButtonController';
/**
 * Controller for driving back navigation from anywhere in the app. Requires
 *   useBackButton to have been called in the top-level app.
 * @author Yuen Ler Chow
 */
export declare const backButtonController: BackButtonController;
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
declare const useBackButton: (handleGoHomeFunc: () => void) => void;
export default useBackButton;
