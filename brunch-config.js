exports.config = {
  npm: {
    enabled: true
  },

  sourceMaps: true,
  overrides: {
    production: {
      sourceMaps: true
    }
  },

  plugins: {
    babel: {
      presets: ['es2015', 'react', 'stage-1'],
      pattern: /\.(es6|jsx|js)$/
    }
  },

  files: {
    javascripts: {
      joinTo: 'javascripts/react-boilerplate.js'
    },
    stylesheets: {
      joinTo: 'stylesheets/react-boilerplate.css'
    }
  },

  server: {
    hostname: '0.0.0.0',
    port: 3333,
    run: true
  }
};
