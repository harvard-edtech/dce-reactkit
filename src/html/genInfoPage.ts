/**
 * Generate a static info page
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.title title of the info box
 * @param opts.body a human-readable text body for the info alert
 * @returns the HTML for the info page
 */
const genInfoPage = (
  opts: {
    title: string,
    body: string,
  },
): string => {
  const {
    title,
    body,
  } = opts;

  return `
<head>
  <!-- Metadata -->
  <meta
    name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
  >

  <!-- Title -->
  <title>${title}</title>

  <!-- Bootstrap -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/css/bootstrap.min.css"
    integrity="sha512-siwe/oXMhSjGCwLn+scraPOWrJxHlUgMBMZXdPe2Tnk3I0x3ESCoLz7WZ5NTH6SZrywMY+PB1cjyqJ5jAluCOg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/js/bootstrap.min.js"
    integrity="sha512-vyRAVI0IEm6LI/fVSv/Wq/d0KUfrg3hJq2Qz5FlfER69sf3ZHlOrsLriNm49FxnpUGmhx+TaJKwJ+ByTLKT+Yg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  ></script>

  <!-- FontAwesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />

  <!-- Style -->
  <style>
    .DCEReactKit-pop-in {
      animation-name: DCEReactKit-pop-in;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      animation-fill-mode: both;

      transform-origin: center;
    }

    @keyframes DCEReactKit-pop-in {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  </style>
</head>

<!-- Body -->
<body class="bg-dark text-center pt-3 ps-3 pe-3">
  <!-- Alert -->
  <div
    class="DCEReactKit-pop-in alert alert-info d-inline-block"
    style="width: 50em; max-width: 100%"
  >
    <!-- Title -->
    <h2>
      <i class="me-1 fa-solid fa-circle-info"></i>
      ${title}
    </h2>
    <!-- Body -->
    <div>
      ${body}
    </div>
  </div>
</body>
  `;
};

export default genInfoPage;
