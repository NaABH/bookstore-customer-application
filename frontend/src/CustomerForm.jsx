import React from 'react';
import { TextField, Button } from '@mui/material';

// CustomerForm component (form for creating and updating customers)
function CustomerForm({ formData, handleFormChange, formErrors, editingId, handleSubmit, handleCancel }) {
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleFormChange}
                error={!!formErrors.firstName}
                inputProps={{ maxLength: 50 }}
            />
            <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleFormChange}
                error={!!formErrors.lastName}
                inputProps={{ maxLength: 50 }}
            />
            <TextField
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleFormChange}
                error={!!formErrors.email}
                inputProps={{ maxLength: 100 }}
            />
            <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
            {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>}
        </form>
    );
}

export default CustomerForm;