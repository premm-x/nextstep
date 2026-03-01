import axios from "axios";


export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESET}`);
    formData.append('cloud_name', `${import.meta.env.VITE_CLOUD_NAME}`);

    const res = await fetch(`${import.meta.env.VITE_CLOUDINARY}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return data.secure_url;
};


export const uploadResumeToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', `${import.meta.env.VITE_UPLOAD_PRESET}`);
    formData.append('cloud_name', `${import.meta.env.VITE_CLOUD_NAME}`);

     const response = await axios.post(
        `${import.meta.env.VITE_CLOUDINARY}/raw/upload`,
        formData
    );
    
    console.log(response.data.secure_url);
    return response.data.secure_url;
};