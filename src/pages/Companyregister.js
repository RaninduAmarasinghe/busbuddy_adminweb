import React, { useState } from 'react';

export default function Companyregister() {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
        companyPassword: '',
    });

    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ text: '', type: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmpty = Object.values(formData).some(field => !field.trim());
        if (isEmpty) {
            setMessage({ text: 'Please fill in all fields.', type: 'error' });
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/companies/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error(await res.text());
            const result = await res.text();

            setMessage({ text: result, type: 'success' });
            setFormData({
                companyName: '',
                companyAddress: '',
                companyEmail: '',
                companyPhone: '',
                companyPassword: '',
            });

        } catch (err) {
            setMessage({ text: err.message, type: 'error' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                    Company Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                    <FormInput label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
                    <FormInput label="Email" type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
                    <FormInput label="Phone Number" type="tel" name="companyPhone" value={formData.companyPhone} onChange={handleChange} />
                    <FormInput label="Password" type="password" name="companyPassword" value={formData.companyPassword} onChange={handleChange} />

                    {message.text && (
                        <p className={`text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                            {message.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Register Company
                    </button>
                </form>
            </div>
        </div>
    );
}

// 🔁 Reusable Input Component
function FormInput({ label, name, value, onChange, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
        </div>
    );
}