import React from 'react';
import Link from 'next/link'

export default function Nav()
{
    return(
        <div className="py-8 bg-gray-800 text-white flex justify-between">
            <div className="w-full">
                <div className="pb-3 w-full text-2xl border-b-2 border-gray-900">
                    <a className="px-10">Kuba's Terrain Generator</a>
                </div> 
                
                <div className="pt-3 px-10">
                    <Link href="/">
                        <div className="text-lg">Home</div>
                    </Link>

                    <Link href="/RandomTerrain">
                        <div className="text-lg">Random</div>
                    </Link>

                    <Link href="/AllSavedTerrains">
                        <div className="text-lg">Saved Terrains</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}