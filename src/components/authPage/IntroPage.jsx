import { UserContext } from '@/config/userContext';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResumeToCloudinary, uploadToCloudinary } from './uploadFile';



export default function IntroPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        resume: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData((prev) => ({ ...prev, resume: file }));
        } else {
            alert('Please upload a PDF file');
        }
    };

    const handleNextStep = () => {
        if (formData.firstName.trim() && formData.lastName.trim()) {
            setStep(2);
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            {step === 1 ? (
                <NameStep
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleNextStep={handleNextStep}
                />
            ) : (
                <ResumeStep
                    formData={formData}
                    handleFileChange={handleFileChange}
                    setStep={setStep}
                />
            )}
        </div>
    );
}

function NameStep({ formData, handleInputChange, handleNextStep }) {
    return (
        <div className="w-full max-w-md px-6 py-12">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome!</h1>
            <p className="text-gray-400 mb-8">Let's start with your name</p>

            <div className="mb-6">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-8">
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Next
            </button>
        </div>
    );
}

function ResumeStep({ formData, handleFileChange, setStep }) {

    const navigate = useNavigate();
    let resumeLink = null;

    const [addloading, setAddLoading] = useState(false);
    const [skiploading, setSkipLoading] = useState(false);

    const [resumeName, setResumeName] = useState("");

    const { userData, setUserData, setLoading } = useContext(UserContext)

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            if (formData.resume)
                resumeLink = await uploadResumeToCloudinary(formData.resume);

            const finalName = resumeName?.trim() ? resumeName : "r1";

            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/update`, {
                email: userData.email,
                username: formData.firstName,
                resume: { url:resumeLink, name:finalName  }

            }, { headers: { Authorization: `Bearer ${token}`, }, });

            console.log('Profile updated successfully:');

            setAddLoading(false)
            setSkipLoading(false)

            localStorage.setItem('token', response.data.token);
            setLoading(false)
            setUserData(response.data.user)

            navigate("/dashboard")
        }
        catch (error) {

            console.log(error);
            setLoading(false)
        }
    };


    return (
        <div className="w-full max-w-md px-6 py-12">
            <h1 className="text-4xl font-bold text-white mb-2">Upload Resume</h1>
            <p className="text-gray-400 mb-8">Add your resume to get started (PDF only)</p>

            <div className={`mb-8 border-2 border-dashed rounded-lg p-8 ${formData.resume ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-gray-700 bg-gray-800'}`}>
                <label htmlFor="resume-input" className="flex flex-col items-center cursor-pointer">
                    <svg className="w-12 h-12 text-gray-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-center text-gray-400">
                        {formData.resume ? formData.resume.name : 'Click to upload or drag PDF here'}
                    </span>
                </label>
                <input
                    id="resume-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <input
                id="resume-name"
                type="text"
                placeholder="Resume name"
                value={resumeName}
                onChange={(e) => { setResumeName(e.target.value); }}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
            />

            <div className="flex gap-3">
                <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                    ← Back
                </button>
                <button
                    disabled={formData.resume}
                    onClick={(e) => { submitHandler(e); setSkipLoading(true) }}
                    className="flex-1 border border-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:text-gray-600 disabled:cursor-not-allowed"
                >
                    {skiploading ? "..." : "Skip"}
                </button>
                <button
                    onClick={(e) => { submitHandler(e); setAddLoading(true) }}
                    disabled={!formData.resume}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                    {addloading ? "..." : "Add"}
                </button>
            </div>
        </div>
    );
}