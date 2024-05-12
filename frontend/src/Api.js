const API_URL = '/customer';
const headers = {
    'Content-Type': 'application/json',
};

export const fetchCustomerData = () => {
    return fetch(API_URL)
        .then(response => response.json())
        .catch(error => { throw error });
};

export const createCustomer = (item) => {
    return fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ firstName: item.firstName, lastName: item.lastName, email: item.email }),
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('A customer with the same email already exists.');
                }
                throw new Error('An error occurred.');
            }
            return response.json();
        })
        .catch(error => { throw error });
};

export const updateCustomer = (updatedItem) => {
    return fetch(`${API_URL}/${updatedItem.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedItem),
    })
        .then(response => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {})
            } else {
                throw new Error('Error updating customer');
            }
        })
        .catch(error => { throw error });
};

export const deleteCustomer = (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers,
    })
        .then(response => {
            if (response.ok) {
                return response.text().then(text => text ? JSON.parse(text) : {})
            } else {
                throw new Error('Error deleting customer');
            }
        })
        .catch(error => { throw error });
};