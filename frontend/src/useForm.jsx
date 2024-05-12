import { useState } from 'react';

function useForm(initialState) {
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setFormData(initialState);
    };

    return [formData, handleInputChange, resetForm];
}