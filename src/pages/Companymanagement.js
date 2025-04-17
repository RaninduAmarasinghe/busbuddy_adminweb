import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Companymanagement() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState('');
    const [editCompany, setEditCompany] = useState(null);
    const [formData, setFormData] = useState({});

    // Fetch all companies
    const fetchCompanies = async () => {
        try {
            const res = await axios.get('http://localhost:8080/companies/all');
            setCompanies(res.data);
        } catch (error) {
            console.error('Failed to fetch companies', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Delete company
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this company?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8080/companies/delete/${id}`);
            setCompanies((prev) => prev.filter((company) => company.companyId !== id));
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    // Handle edit
    const handleEdit = (company) => {
        setEditCompany(company);
        setFormData(company);
    };

    // Handle update submit
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/companies/update/${editCompany.companyId}`, formData);
            setEditCompany(null);
            fetchCompanies();
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    const filtered = companies.filter((c) =>
        c.companyName.toLowerCase().includes(search.toLowerCase()) ||
        c.companyId.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 text-gray-900">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Company Management</h1>

            <div className="max-w-3xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search by Company ID or Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="max-w-6xl mx-auto grid gap-6">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500">No companies found.</p>
                ) : (
                    filtered.map((company) => (
                        <div
                            key={company.companyId}
                            className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-lg transition"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{company.companyName}</h2>
                                <p className="text-sm text-gray-500">ID: {company.companyId}</p>
                                <p className="text-sm text-gray-500">Email: {company.companyEmail}</p>
                                <p className="text-sm text-gray-500">Phone: {company.companyPhone}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() => handleEdit(company)}
                                    className="text-blue-500 hover:text-blue-600 transition"
                                    title="Edit Company"
                                >
                                    <PencilIcon className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleDelete(company.companyId)}
                                    className="text-red-500 hover:text-red-600 transition"
                                    title="Delete Company"
                                >
                                    <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {editCompany && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form
                        onSubmit={handleUpdate}
                        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4 relative"
                    >
                        <button
                            onClick={() => setEditCompany(null)}
                            type="button"
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-semibold text-blue-600">Edit Company</h3>

                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="Company Name"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        <input
                            type="email"
                            value={formData.companyEmail}
                            onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        <input
                            type="tel"
                            value={formData.companyPhone}
                            onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                            placeholder="Phone"
                            className="w-full border border-gray-300 rounded p-2"
                        />
                        <input
                            type="text"
                            value={formData.companyAddress}
                            onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                            placeholder="Address"
                            className="w-full border border-gray-300 rounded p-2"
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setEditCompany(null)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}