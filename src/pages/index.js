import * as React from "react";

import { Layout } from "../components/layout";
import { SeoItem } from "../components/seo";

const IndexPage = () => {
  return <Layout pageTitle="Andrew's Portfolio"></Layout>;
};

export const Head = () => <SeoItem />;

export default IndexPage;
