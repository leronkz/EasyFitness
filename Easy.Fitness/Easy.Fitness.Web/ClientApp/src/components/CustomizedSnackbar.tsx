import React from "react";
import { Snackbar, Box } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  open: boolean;
  handleClose: () => void;
  type: any;
  message: string;
}

export interface SnackbarInterface {
  open: boolean;
  type: any;
  message: string;
}

export default function CustomizedSnackbar({ open, handleClose, type, message }: SnackbarProps) {

  const handleCloseSnackbar = (event: object, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  };

  return (
    <Box>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%", fontFamily: 'Lexend' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}