module.exports = {
  //...
  resolve: {
    extensions: [".ts", ".tsx"],
    fallback: { process: require.resolve("process/browser") },
  },
};
