const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const inputDir = "src";

module.exports = function(conf) {
  // Enable syntax highlighting
  conf.addPlugin(syntaxHighlight);

  conf.addPassthroughCopy("CNAME");
  conf.addPassthroughCopy("utterances.json");
  conf.addPassthroughCopy("static");

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
