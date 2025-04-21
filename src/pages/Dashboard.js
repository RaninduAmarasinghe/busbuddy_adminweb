import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const cards = [
        {
            title: 'Company Registration',
            description: 'Register a new company to manage transport operations efficiently.',
            link: '/company/register',
            buttonText: 'Register Now',
        },
        {
            title: 'Company Management',
            description: 'View, update and maintain existing company profiles in one place.',
            link: '/company/management',
            buttonText: 'Manage Companies',
        },
        {
            title: 'Support Inbox ',
            description: 'Access support tools and resolve issues for better assistance.',
            link: '/support/inbox',
            buttonText: 'Open Support',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 text-gray-900 font-sans">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 mb-14 tracking-tight">
                🚍 BusBuddy Admin Dashboard
            </h1>

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 ease-in-out p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                {card.title}
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <Link
                                to={card.link}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                            >
                                {card.buttonText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}