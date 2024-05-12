import { useState, useEffect } from 'react';
import CustomerList from './CustomerList';

const term = "Customer";
const API_URL = '/customer';
const headers = {
    'Content-Type': 'application/json',
};

function Customer() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const fetchCustomerData = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
    };

    const handleCreate = (item) => {

        console.log(`add item: ${JSON.stringify(item)}`)

        fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ firstName: item.firstName, lastName: item.lastName, email: item.email }),
        })
            .then(response => response.json())
            .then(returnedItem => setData([...data, returnedItem]))
            .catch(error => setError(error));
    };

    const handleUpdate = (updatedItem) => {

        console.log(`update item: ${JSON.stringify(updatedItem)}`)

        fetch(`${API_URL}/${updatedItem.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatedItem),
        })
            .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem : item)))
            .catch(error => setError(error));
    };

    const handleDelete = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers,
        })
            .then(() => setData(data.filter(item => item.id !== id)))
            .catch(error => console.error('Error deleting item:', error));
    };


    return (
        <div>
            <CustomerList
                name={term}
                data={data}
                error={error}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Customer;