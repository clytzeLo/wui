module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
    // ['es2015', { modules: false}]
  ],
  plugins: [
    [
      "import",
      {
          "libraryName": "tss_ui",
          "libraryDirectory": "packages"
      }
    ],
  ]
}
