module.exports = {
  style: {
    postcss: {
      plugins: [
        require('@tailwindcss/postcss'), // new plugin
        require('autoprefixer'),
      ],
    },
  },
};
