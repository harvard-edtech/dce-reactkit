// Import types
import BackState from './BackState';

/**
 * Controller for the back button, used to drive back navigation from anywhere
 *   in the app. Pass this to subpanels so they can describe their state and
 *   send the user home.
 * @author Yuen Ler Chow
 */
type BackButtonController = {
  /**
   * Call this when the user navigates to a child of the home screen (something
   *   they can come back from)
   */
  onSubpanelEntered: () => void,
  /**
   * Send the user back to the home screen
   * @param [force] if true, go home immediately without checking the subpanel
   *   state (no confirmation, not blocked). If falsy, nothing happens when
   *   blocked and confirmation is required when there are unsaved changes
   */
  goHome: (force?: boolean) => Promise<void>,
  /**
   * Set the state of the current subpanel, which determines what happens when
   *   the user tries to go back
   * @param newSubpanelState the new state of the subpanel
   */
  setSubpanelState: (newSubpanelState: BackState) => void,
  /**
   * Set the confirmation message shown if the user tries to go back while there
   *   are unsaved changes (cleared upon returning to the home screen)
   * @param message the message to show
   */
  setCustomUnsavedChangesMessage: (message: string) => void,
  /**
   * Set the message shown if the user tries to go back while blocked (cleared
   *   upon returning to the home screen)
   * @param message the message to show
   */
  setCustomBlockedMessage: (message: string) => void,
};

export default BackButtonController;
