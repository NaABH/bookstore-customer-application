import { useState } from 'react';
import { TextField, Button, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function CustomerList({ name, data, onCreate, onUpdate, onDelete, error }) {

    console.log(`CustomerList: ${JSON.stringify(data)}`)

    const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '' });
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered list based on search query
    const filteredData = searchQuery.trim() !== '' ?
        data.filter(item => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase().replace(/\s+/g, '');
            const searchTerm = searchQuery.toLowerCase().replace(/\s+/g, '');
            return fullName.includes(searchTerm);
        }
        ) :
        [];

    // useEffect(() => {
    //     if (editingId === null) {
    //         setFormData({ id: '', firstName: '', lastName: '', email: '' });
    //     } else {
    //         const currentItem = data.find(item => item.id === editingId);
    //         setFormData(currentItem);
    //     }
    // }, [editingId, data]);

    const handleFormChange = (event) => {

        console.log(`handleFormChange: ${event.target.name} ${event.target.value}`)

        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            alert('Please fill in all fields.');
            return; // Stop further execution
        }

        // Email validation regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email.trim())) {
            alert('Please enter a valid email address.');
            return; // Stop further execution
        }

        console.log(`handleSubmit: ${JSON.stringify(formData)}`)

        if (editingId !== null) {
            console.log(`onUpdate: ${JSON.stringify(formData)}`)
            onUpdate(formData);
        } else {
            onCreate(formData);
        }
        setFormData({ id: '', firstName: '', lastName: '', email: '' });
        setEditingId(null);
    };

    const handleEdit = (item) => {
        setFormData({
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
        });
        setEditingId(item.id);
    };

    const handleCancel = () => {
        setFormData({ id: '', firstName: '', lastName: '', email: '' });
        setEditingId(null);
    };

    const handleDelete = (id) => {
        onDelete(id);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Add / Edit {name}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <TextField
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    inputProps={{ maxLength: 100 }}
                />
                <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
                {editingId !== null && <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>}
            </form>
            <h2>Search {name} by Name</h2>
            <TextField
                label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                variant="outlined"
                margin="normal"
            />
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {filteredData.map(item => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                <Delete />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={`${item.firstName} ${item.lastName}`} secondary={item.email} />
                    </ListItem>
                ))}
            </List>
            <h2>List of Existing {name}s</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto', width: '100%', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '360px' }}>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {data.map(item => (
                        <ListItem key={item.id} secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                    <Delete />
                                </IconButton>
                            </>
                        }>
                            <ListItemText primary={`${item.firstName} ${item.lastName}`} secondary={item.email} />
                        </ListItem>
                    ))}
                </List>
            </div>
            {error && <p>{error}</p>}
        </Box>
    );
}

export default CustomerList;