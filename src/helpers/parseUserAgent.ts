/**
 * Perform a rudimentary parsing of the user's browser agent string
 * @author Gabe Abrams
 * @param userAgent the user's browser agent
 * @returns user info
 */
const parseUserAgent = (userAgent: string) => {
  /* ------------- Browser ------------ */

  let browser: { name: string, version: string } = {
    name: 'Unknown',
    version: 'Unknown',
  };

  // Parse user agent
  let verOffset: number;
  let nameOffset: number;
  if ((verOffset = userAgent.indexOf('Opera')) !== -1) {
    // In Opera, the true version is after 'Opera' or after 'Version'
    browser = {
      name: 'Opera',
      version: userAgent.substring(verOffset + 6),
    };
    if ((verOffset = userAgent.indexOf('Version')) !== -1) {
      browser.version = userAgent.substring(verOffset + 8);
    }
  } else if ((verOffset = userAgent.indexOf('MSIE')) !== -1) {
    // In MSIE, the true version is after 'MSIE' in userAgent
    browser = {
      name: 'Internet Explorer',
      version: userAgent.substring(verOffset + 5),
    };
  } else if ((verOffset = userAgent.indexOf('Chrome')) !== -1) {
    // In Chrome, the true version is after 'Chrome'
    browser = {
      name: 'Chrome',
      version: userAgent.substring(verOffset + 7),
    };
  } else if ((verOffset = userAgent.indexOf('Safari')) !== -1) {
    // In Safari, the true version is after 'Safari' or after 'Version'
    browser = {
      name: 'Safari',
      version: userAgent.substring(verOffset + 7),
    };
    if ((verOffset = userAgent.indexOf('Version')) !== -1) {
      browser.version = userAgent.substring(verOffset + 8);
    }
  } else if ((verOffset = userAgent.indexOf('Firefox')) != -1) {
    // In Firefox, the true version is after 'Firefox'
    browser = {
      name: 'Firefox',
      version: userAgent.substring(verOffset + 8),
    };
  } else if (
    (nameOffset = userAgent.lastIndexOf(' ') + 1)
    < (verOffset = userAgent.lastIndexOf('/'))
  ) {
    browser = {
      name: userAgent.substring(nameOffset, verOffset),
      version: userAgent.substring(verOffset + 1),
    };
  }

  // Postprocess version
  // trim the fullVersion string at semicolon/space if present
  let ix: number;
  if ((ix = browser.version.indexOf(';')) !== -1) {
    browser.version = browser.version.substring(0, ix);
  }
  if ((ix = browser.version.indexOf(' ')) !== -1) {
    browser.version = browser.version.substring(0, ix);
  }

  /* ------------- Device ------------- */

  // Detect os
  let os = 'Unknown';
  if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('like Mac')) {
    os = 'iOS';
  } else if (userAgent.includes('Mac')) {
    os = 'Mac';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('Win')) {
    os = 'Win';
  }

  // Check if mobile
  const isMobile = !!userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

  // Device
  const device = {
    isMobile,
    os,
  };

  /* ------------- Finish ------------- */
  
  // Return info
  return {
    browser,
    device,
  };
};

export default parseUserAgent;
