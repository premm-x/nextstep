import React, { useState } from 'react';

export default function SheetGuide({ setIsSheetGuideOpen, issheetGuideOpen }) {

    const toggleSidebar = () => {
        setIsSheetGuideOpen(!issheetGuideOpen);
    };

    return (
        <div>

            {/* Backdrop */}
            {issheetGuideOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-[0.5] bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed right-0 top-0 h-screen w-[75%] bg-[#111111] text-white shadow-lg transform transition-transform duration-600 ease-in-out z-40 
                ${issheetGuideOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold ">Guide</h2>
                    <button 
                        className="text-2xl "
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    <p className="">Your content goes here</p>
                </div>
            </div>

        </div>
    );
}