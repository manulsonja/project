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
         h1: { fontSize: "30px",
         fontWeight: 800,

        }
  },
});

export default theme;