import React from 'react';
import Router from 'next/router';

function NewButton()
{
    return(
        <div className="flex justify-center">
            <div className="relative text-gray-700">
                <button onClick={() => Router.push({ path: '/RandomTerrain' })} className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-blue-600 rounded-r-lg hover:bg-blue-500 focus:bg-blue-700">New Terrain</button>
            </div>
        </div>
    )
}

export default NewButton;