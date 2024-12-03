/**
 * Universal stylesheet
 * @author Gabe Abrams
 */
const shared = `
/* Button with no style */
.btn-nostyle {
  border: 0 !important;
  background: transparent !important;
  outline: 0 !important;
  font-size: inherit !important;
  color: inherit !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Tooltip on Very Top */
.tooltip {
  z-index: 9000000000 !important;
}

/* Tooltip White Text */
.tooltip .tooltip-inner {
  color: white !important;
}
`;

export default shared;
