/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {      
      colors: {
      'ec_themecolor_primary': 'var(--theme-color-primary)',
      'ec_themecolor_secondary': 'var(--theme-color-secondary)',
      'ec_text_color': 'var(--theme-text-color)',
      'ec_stroke_purple':  'var(--theme-color-primary)',
      'ec_stroke_gray':  'var(--theme-gray)',
      'ec_button': 'var(--theme-btn-bg)',
      'ec_button-hover': 'var(--theme-btn-hover)',
      'flp_background': 'var(--body-bg-color)',
      'flp_header_bg': 'var(--top-banner)',   
      'landing_accent': 'var(--landing-theme-clr)',
      'landing_secondary': 'var(--landing-secondary-clr)',
      'landing_text': 'var(--landing-text-clr)',
      'landing_background': 'var(--landing-bg-color)',
      'landing_header_bg': 'var(--top-banner)',          
      'landing_button': 'var(--landing-btn-bg-color)',
      'landing_button-hover': 'var(--btn-primary-hover-color)',
    }},
  },
  plugins: [],
}
