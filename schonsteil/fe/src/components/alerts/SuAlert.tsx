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
export function NoInputAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Fehler</AlertTitle>
        Bitte fuellen Sie das Formular vollstaendig aus.
      </Alert>
    </Stack>
  );
}
export function NoEmailAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Fehler</AlertTitle>
        Bitte geben Sie eine gueltige E-Mail an.
      </Alert>
    </Stack>
  );
}
export function ResetSuccessAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Erfolg</AlertTitle>
        Wenn ein Nutzer mit Ihrer E-Mail Addresse existiert, 
        senden wir Ihnen eine Mail mit einem Link zur Ruecksetzung ihres Passwortes. Bei Problemen kontaktieren Sie bitte den Administrator ...
      </Alert>
    </Stack>
  );
}
export function InvalidTokenAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Fehler</AlertTitle>
        Dieser Link ist abgelaufen. Bitte sehen Sie nach ob Sie auf eine alte Email geklickt haben, wenn nicht beantragen Sie einen neuen Link zur Ruecksetzung. Sollte das Problem persistieren kontaktieren Sie den Admnistrator
      </Alert>
    </Stack>
  );
}
export function SuccessChangeAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Erfolg</AlertTitle>
          Die Aenderung Ihres Passwortes wurde erfolgreich durchgefuehrt.
      </Alert>
    </Stack>
  );
}
export function NoMatchAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Fehler</AlertTitle>
    Die eingegebenen Passwoerter stimmen nicht ueberein!
      </Alert>
    </Stack>
  );
}