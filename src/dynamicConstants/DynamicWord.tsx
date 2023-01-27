// Import shared types
import isMobileOrTablet from '../helpers/isMobileOrTablet';

// Check if mobile
const isMobile = isMobileOrTablet();

/**
 * Dynamic words determined by the user's platform
 * @author Gabe Abrams
 */
const DynamicWord = {
  Click: (
    isMobile
      ? 'tap'
      : 'click'
  ),
  ClickCapitalized: (
    isMobile
      ? 'Tap'
      : 'Click'
  ),
  App: (
    isMobile
      ? 'app'
      : 'application'
  ),
  AppCapitalized: (
    isMobile
      ? 'App'
      : 'Application'
  ),
  Device: (
    isMobile
      ? 'device'
      : 'computer'
  ),
  DeviceCapitalized: (
    isMobile
      ? 'Device'
      : 'Computer'
  ),
};

export default DynamicWord;
