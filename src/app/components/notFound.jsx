import * as React from "react";
import Link from "next/link";

import {
  notFoundDiv,
  notFoundHeading,
  notFoundParagraph,
  notFoundLinkText,
} from "./notFound.module.css";

export default function NotFoundPage() {
  return (
    <div className={notFoundDiv}>
      <span className={notFoundHeading}>Page not found</span>
      <p className={notFoundParagraph}>
        Sorry 😔, we couldn't find what you were looking for.
        <br />
        <br />
        <Link href="/" className={notFoundLinkText}>
          Go home
        </Link>
        .
      </p>
    </div>
  );
}
