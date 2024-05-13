import React from 'react';
import { TextField, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// CustomerList component (display search bar and list of customers)
function CustomerList({ searchQuery, handleSearchChange, data, filteredData, handleEdit, handleDelete}) {
    return (
        <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Search Customer by Name</h2>
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
            <h2>List of Existing Customers</h2>
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
        </Box>
    );
}

export default CustomerList;