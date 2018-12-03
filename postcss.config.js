module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'ie >= 11',
        'last 2 versions',
        'android >= 4'
      ]
    }),
    require('cssnano')({
      zindex: false
    })
  ]
};
