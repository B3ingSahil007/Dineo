import React from 'react';

const Setting = () => {
    return (
        <div className="w-full flex items-center justify-center p-6">
            <div className="shadow-lg bg-gray-700 rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-500 mb-2">Settings</h1>
                <p className="text-gray-900">This feature is under development.</p>
                
                {/* Loader Animation */}
                <div className="flex justify-center my-6">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                {/* Coming Soon Message */}
                <p className="text-sm text-gray-100">Stay tuned for updates!</p>
            </div>
        </div>
    );
};

export default Setting;
