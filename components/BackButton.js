import React from 'react';
import Router from 'next/router';

function BackButton()
{
    return(
        <div className="flex justify-center">
            <div className="relative text-gray-700 p-3">
                <button onClick={() => Router.back()} className="flex items-center px-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:bg-blue-700">Back</button>
            </div>
        </div>
    )

}

export default BackButton;