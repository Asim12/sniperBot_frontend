// Toast.js
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const Toast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const showToast = (newSeverity, newMessage) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleToastClose}>
      <Alert onClose={handleToastClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
