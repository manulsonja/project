import { createTheme } from '@material-ui/core';
import { green, purple, blue } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: '#FFDABC',
    },
    secondary: {
      main: '#FFFFF8',
    },
 
   
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeight: 300,
        h1: { fontSize: "30px",
          fontWeight: 800,
        },
        h2: { fontSize: "24px",
        fontWeight: 700,
      }, 

      footer: {
        fontWeight: 500,
        fontSize: "24px",

      },
      footerH1: {
        fontWeight: 500,
        fontSize: "28px",

      },
      infobox: {
        fontWeight: 700,
        fontSize: "20px",
      },
    
      articleTitle: {
        fontWeight: 800,
       },
      
  
  },
});

export default theme;