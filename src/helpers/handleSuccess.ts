/**
 * Send successful API response
 * @author Gabe Abrams
 * @param res express response
 * @param body the body of the response to send to the client
 */
const handleSuccess = (res: any, body: any): undefined => {
  // Send a http 200 json response
  res.json({
    // Include the body as a parameter
    body,
    // Success = true flag so client can detect successful responses
    success: true,
  });
  return undefined;
};

export default handleSuccess;
