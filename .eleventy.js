const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

const rss = require("@11ty/eleventy-plugin-rss");

const inputDir = "src";

module.exports = function(conf) {
  // Enable syntax highlighting
  conf.addPlugin(syntaxHighlight);

  // Enable RSS feed
  conf.addPlugin(rss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash"
    }
  });
  conf.addLiquidFilter("dateToRfc3339", rss.dateToRfc3339);

  conf.addPassthroughCopy("CNAME");
  conf.addPassthroughCopy("utterances.json");
  conf.addPassthroughCopy("static");

  const markdown = markdownIt("commonmark", {
    typographer: true
  });
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
