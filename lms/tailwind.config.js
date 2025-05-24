/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize : {
        'course-deatails-heading-small' : ['26px','36px'],
        'course-deatails-heading-large' : ['36px','44px'],
        'course-heading-small' : ['28px','34px'],
        'course-heading-large' : ['48px','56px'],
        'default':['15px','21px']
      },
      gridTemplateColumns : {'auto' : 'repeat(auto-fit,minmax(200px,1fr))'},
      spacing:{
        'section-heigth' : '500px',
      },
      maxHeight:{
        'course-card' : '424px'
      },
      boxShadow:{
        'custom-card':'0px 4px 15px 2px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}

