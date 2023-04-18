import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CallIcon from '@mui/icons-material/Call';


export default function AlertDialog(props) {

  const [open, setOpen] = React.useState(false);
  const contact_info = props.props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <CallIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Kontakaddresse {contact_info.name}

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Telefonnummer: {contact_info.telephone}<br/>
            Email:{contact_info.email}<br/>
            Website:{contact_info.website}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Weg!!!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}