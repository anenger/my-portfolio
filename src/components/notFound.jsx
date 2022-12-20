import * as React from "react";
import { Link } from "gatsby";

import { page, heading, paragraph, linkText } from "./notFound.module.css";
import { hoverUnderlineAnimation } from "./global.module.css";

const NotFoundPage = () => {
  return (
    <main>
      <body className={page}>
        <span className={heading}>Page not found</span>
        <p className={paragraph}>
          Sorry 😔, we couldn't find what you were looking for.
          <br />
          <br />
          <Link to="/" className={`${linkText} ${hoverUnderlineAnimation}`}>
            Go home
          </Link>
          .
        </p>
      </body>
    </main>
  );
};

export default NotFoundPage;
