import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-6">
                <span className="text-xl font-semibold text-gray-600 font-inter animate-pulse">Loading...</span>

                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>

                    <div className="absolute inset-3 border-4 border-t-amber-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

                    <div className="absolute inset-6 border-4 border-t-green-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
