import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ContactDialoge({open, close, data}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Kontaktinfo {data.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <ul>
            <li>
              <Button                
                target="_blank"
                component="a"
                href= {`http://${data.website}`}
                rel="noreferrer">
                {data.website}
                </Button>  
              </li>
            <li>Telephone: {data.telephone}</li>
            <li>Email: {data.email}</li>
           </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} autoFocus>
            Schliessen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}