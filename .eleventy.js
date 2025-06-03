// 11ty Plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

// Helper packages
const slugify = require("slugify");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItDeflist = require("markdown-it-deflist");

module.exports = function (eleventyConfig) {
  let markdownLib = markdownIt().use(markdownItDeflist);
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventySass);

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy("./src/ceur-ws/*.pdf");
  eleventyConfig.addPassthroughCopy("./src/ceur-ws/*.css");
  eleventyConfig.addPassthroughCopy("./src/ceur-ws/*.png");
  eleventyConfig.addPassthroughCopy("./src/papers/*.pdf");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("pages2024", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/2024/pages/*.md");
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        class: "tdbc-anchor",
        space: false,
      }),
      level: [2],
      slugify: (str) =>
        slugify(str, {
          lower: true,
          strict: true,
          remove: /["]/g,
        }),
    })
    .use(markdownItDeflist);
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
    },
  };
};
