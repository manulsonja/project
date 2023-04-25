import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export  function ExistsAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">
        <AlertTitle>Warnung</AlertTitle>
        Es existiert bereits ein Account unter der angegebenen Addresse. <strong>Login | Passwort-Reset</strong>
      </Alert>
    </Stack>
  );
}

export function TooShortAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Warnung</AlertTitle>
        Das eingegebene Passwort ist zu kurz. Bitte benutzen Sie ein Passwort mit mindestens <strong>8</strong> Zeichen.
      </Alert>
    </Stack>
  );
}