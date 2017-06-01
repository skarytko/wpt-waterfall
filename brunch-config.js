// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {
    joinTo: {
      'vendor.css': /^(?!app)/,
      'app.css': /^app/
    }
  }
};

exports.plugins = {
  babel: {presets: ['latest']},
  sass: {
    precision: 8
  },
  postcss: {
    processors: [
      require('autoprefixer')(['last 8 versions'])
    ]
  },
  vue: {
    extractCSS: true
  }
};

exports.npm = {
  styles: {
    'animate.css': ['animate.css']
  }
};
