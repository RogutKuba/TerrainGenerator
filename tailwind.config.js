module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {

      /*
      colors: {
        // Configure your color palette here
        'darkgray': 'background-color: rgba(55, 65, 81, 1)',
      },
    */
      gridTemplateColumns: {
        // Simple 16 column grid
       '25': 'repeat(25, minmax(0, 1fr))',
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}