import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/products/add-product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product added:', response.data);
            navigate('/products'); // Redirect to the products page
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
                <label>Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Image</label>
                <input type="file" onChange={handleFileChange} required />
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
