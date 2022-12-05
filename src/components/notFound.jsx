import * as React from "react";
import { Link } from "gatsby";

import { page, heading, paragraph } from "./notFound.module.css";
import { hoverUnderlineAnimation } from "./global.module.css";

const NotFoundPage = () => {
  return (
    <main className={page}>
      <span className={heading}>Page not found</span>
      <p className={paragraph}>
        Sorry 😔, we couldn't find what you were looking for.
        <br />
        <br />
        <Link to="/" className={hoverUnderlineAnimation}>
          Go home
        </Link>
        .
      </p>
    </main>
  );
};

export default NotFoundPage;
