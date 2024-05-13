import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';

// CustomerContainer component (container for CustomerForm and CustomerList)
function CustomerContainer({ name, data, onCreate, onUpdate, onDelete }) {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
    const [formErrors, setFormErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Reset form when data changes
    useEffect(() => {
        if (data) {
            // If there's new data, reset the form
            setFormData({ firstName: '', lastName: '', email: '' });
            setEditingId(null);
        }
    }, [data]);

    // Filtered list based on search query
    const filteredData = searchQuery.trim() !== '' ?
        data.filter(item => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase().replace(/\s+/g, '');
            const searchTerm = searchQuery.toLowerCase().replace(/\s+/g, '');
            return fullName.includes(searchTerm);
        }
        ) :
        [];

    // Handle form change
    const handleFormChange = useCallback((event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }, [formData]);

    // Trim form data
    const trimFormData = (formData) => ({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
    });

    // Validate form data
    const validateFormData = (trimmedData) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedData.firstName) {
            errors.firstName = 'First name cannot be blank.';
        }
        if (!trimmedData.lastName) {
            errors.lastName = 'Last name cannot be blank.';
        }
        if (!trimmedData.email) {
            errors.email = 'Email cannot be blank.';
        } else if (!emailRegex.test(trimmedData.email)) {
            errors.email = 'Please enter a valid email address.';
        }
        return errors;
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedData = trimFormData(formData);
        const errors = validateFormData(trimmedData);

        setFormErrors(errors);

        // If there are any errors, stop execution
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join('\n');
            alert(errorMessages);
            return;
        }

        // console.log(`handleSubmit: ${JSON.stringify(formData)}`)

        if (editingId !== null) {
            // console.log(`onUpdate: ${JSON.stringify(formData)}`)
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
        setFormData({ id: '', firstName: '', lastName: '', email: '' });
        setEditingId(null);
    };

    // Handle edit of customer record
    const handleEdit = (item) => {
        setFormData({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
        });
        setEditingId(item.id);
    };

    // Handle cancel of editing
    const handleCancel = useCallback(() => {
        setFormData({ firstName: '', lastName: '', email: '' });
        setEditingId(null);
    }, []);

    // Handle delete of customer record
    const handleDelete = (id) => {
        onDelete(id);
    };

    // Handle search change
    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Add / Edit {name}</h2>
            <CustomerForm
                formData={formData}
                handleFormChange={handleFormChange}
                formErrors={formErrors}
                editingId={editingId}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
            <CustomerList
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                data={data}
                filteredData={filteredData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </Box>
    );
}

export default CustomerContainer;