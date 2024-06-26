import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AlertSnackbar({ open, handleClose, message, severity }) {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={3000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AlertSnackbar;