import { useState, useEffect } from 'react';
import { fetchCustomerData, createCustomer, updateCustomer, deleteCustomer } from '../services/Api';
import AlertSnackbar from './AlertSnackbar';
import CustomerContainer from './CustomerContainer';

const term = "Customer";

function Customer() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        document.title = "Bookstore Customer Record";
        loadData();
    }, []);

    // Fetch customer data
    const loadData = async () => {
        try {
            const data = await fetchCustomerData();
            console.log('Rendering component with data', data);
            setData(data);
        } catch (error) {
            setMessage(error.message);
            setSeverity('error');
            setOpen(true);
        }
    };

    // Create new customer record
    const handleCreate = async (item) => {
        try {
            const returnedItem = await createCustomer(item);
            setData([...data, returnedItem]);
            setMessage('Customer record created successfully.');
            setSeverity('success');
            setOpen(true);
        } catch (error) {
            setMessage(error.message);
            setSeverity('error');
            setOpen(true);
        }
    };

    // Update customer record
    const handleUpdate = async (updatedItem) => {
        setData(prevData => prevData.map(item => item.id === updatedItem.id ? updatedItem : item));
        try {
            await updateCustomer(updatedItem);
            setMessage('Customer record updated successfully.');
            setSeverity('success');
            setOpen(true);
        } catch (error) {
            setData(prevData => prevData.map(item => item.id === updatedItem.id ? item : updatedItem));
            setMessage(error.message);
            setSeverity('error');
            setOpen(true);
        }
    };

    // Delete customer record
    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            console.log('Deleting customer', id);
            const newData = data.filter(item => item.id !== id);
            setData(newData);
            setMessage('Customer record deleted successfully.');
            setSeverity('success');
            setOpen(true);
        } catch (error) {
            setMessage(error.message);
            setSeverity('error');
            setOpen(true);
        }
    };

    // Close Snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div>
            <AlertSnackbar open={open} handleClose={handleClose} message={message} severity={severity} />
            <CustomerContainer
                name={term}
                data={data}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Customer;