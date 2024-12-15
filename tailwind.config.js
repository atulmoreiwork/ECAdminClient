/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {      
      colors: {
      'flp_accent': 'var(--theme-color)',
      'flp_text': 'var(--text-color)',
      'flp_background': 'var(--body-bg-color)',
      'flp_header_bg': 'var(--top-banner)',          
      'flp_button': 'var(--btn-primary-bg)',
      'flp_button-hover': 'var(--btn-primary-hover-color)',
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
