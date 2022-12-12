import * as React from "react";
import NotFound from "../components/notFound";
import SeoItem from "../components/seo";

const NotFoundPage = () => {
  return <NotFound></NotFound>;
};

export const Head = () => <SeoItem title={"Page Not Found"} />;

export default NotFoundPage;
