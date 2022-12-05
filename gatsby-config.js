/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Andrew Enger`,
    siteUrl: `https://www.anenger.com`,
    description: `Andrew Enger is a Software Engineer at Microsoft. He enjoys creating interactive experiences on the web.`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `jobs`,
        path: `${__dirname}/src/content/jobs`,
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

        // /* Self-hosted fonts config. Add font files and font CSS files to "static" folder */
        // custom: [
        //   {
        //     /* Exact name of the font as defied in @font-face CSS rule */
        //     name: ["Font Awesome 5 Brands", "Font Awesome 5 Free"],
        //     /* Path to the font CSS file inside the "static" folder with @font-face definition */
        //     file: "/fonts/fontAwesome/css/all.min.css",
        //   },
        // ],

        /* Web fonts. File link should point to font CSS file. */
        web: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Exo",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Exo",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Asap",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Asap",
          },
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: "Spinnaker",
            /* URL to the font CSS file with @font-face definition */
            file: "https://fonts.googleapis.com/css2?family=Spinnaker",
          },
        ],
      },
    },
  ],
};
