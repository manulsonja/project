import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function AuthAlerts() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Fehler</AlertTitle>
        Uns ist kein Account mit den angegebenen Daten bekannt!
      </Alert>
    </Stack>
  );
}