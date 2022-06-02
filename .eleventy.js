const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

const inputDir = "src";

module.exports = function(conf) {
  // Enable syntax highlighting
  conf.addPlugin(syntaxHighlight);

  conf.addPassthroughCopy("CNAME");
  conf.addPassthroughCopy("utterances.json");
  conf.addPassthroughCopy("static");

  const markdown = markdownIt({html: true, typographer: true});
  markdown
    .use(markdownItFootnote)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
    });
  conf.setLibrary("md", markdown);

  conf.addCollection("blog", function(coll) {
    return coll.getFilteredByGlob(inputDir + "/_blog/*.md").reverse();
  })

  return {
    dir: {
      input: inputDir,
      layouts: "_layouts",
    },
  };
};
