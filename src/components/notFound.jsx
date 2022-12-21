import * as React from "react";
import { Link } from "gatsby";

import {
  notFoundDiv,
  notFoundHeading,
  notFoundParagraph,
  notFoundLinkText,
} from "./notFound.module.css";
import { hoverUnderlineAnimation } from "./global.module.css";

const NotFoundPage = () => {
  return (
    <main>
      <body>
        <div className={notFoundDiv}>
          <span className={notFoundHeading}>Page not found</span>
          <p className={notFoundParagraph}>
            Sorry 😔, we couldn't find what you were looking for.
            <br />
            <br />
            <Link
              to="/"
              className={`${notFoundLinkText} ${hoverUnderlineAnimation}`}
            >
              Go home
            </Link>
            .
          </p>
        </div>
      </body>
    </main>
  );
};

export default NotFoundPage;
