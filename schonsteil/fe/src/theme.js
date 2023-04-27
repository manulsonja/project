import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
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
  },
});

export default theme;