/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Andrew Enger`,
    siteUrl: `https://www.anenger.com`,
    description: `Andrew Enger is a Software Engineer at Microsoft. He enjoys creating interactive experiences on the web.`,
    twitterUsername: `@securecop`,
    image: `/icon.png`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `staticContent`,
        path: `${__dirname}/src/content/static`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [{ resolve: "gatsby-remark-external-links" }],
      },
    },
    {
      /* Include plugin */
      resolve: "gatsby-omni-font-loader",

      /* Plugin options */
      options: {
        /* Font loading mode */
        mode: "async",
        /* Enable font loading listener to handle FOUT */
        enableListener: true,
        /* Preconnect URL-s. This example is for Google Fonts */
        preconnect: ["https://fonts.gstatic.com"],
        /* Web fonts. File link should point to font CSS file. */
        web: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Exo",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Exo&display=swap",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Asap",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Asap&display=swap",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Spinnaker",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Spinnaker&display=swap",
          },
        ],
      },
    },
  ],
};
