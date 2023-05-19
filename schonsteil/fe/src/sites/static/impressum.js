import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@mui/material/Typography';
import theme from '../../theme';


const Impressum = () => {
  return (
    <React.Fragment>
    <Container maxWidth='lg'
        style={{ marginTop: '40px'}}
        >

    <Typography
        sx={{ mb: 2 }}

    variant='h3'>
    Impressum
    </Typography>
    <Typography
    variant='h2'>
    Fuer die Inhalte dieser Website ist verantwortlich:

    </Typography>
    <Typography
    variant='h5'>
    Herr Maximilian Ehlenz<br/>
    Am Hoehnchen 7<br/>
    53127 Bonn <br/>
    DEUTSCHLAND
    <p>    maxehlenz@schonsteil.cm
</p>
    
    </Typography>
  
    <Typography
    variant='h6'>
   Trotz sorgfaeltiger Pruefung kann Ich nicht die Richtigkeit der dargestellten Inhalte garantieren.
     Fuer inkorrekte Angaben wird keine Haftung uebernommen. 
    
    </Typography>
 
     </Container>

     </React.Fragment>
  
  
  
  )
}

export default Impressum