import React, { useState } from 'react';
import axios from 'axios';

function DelButton({ terrainname }){

    const [delbutton, setDelButton] = useState({
        confirmed: false,
        deleted: false,
        buttonhtml: (
            <div className="relative text-gray-700 p-3">
                <button onClick={deleteTerrain} className="flex items-center px-4 font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 focus:bg-red-700">Delete</button>
            </div>
        )
    });

    function deleteTerrain()
    {
        if(!delbutton.deleted)
        {
            setDelButton({
                confirmed: false,
                deleted: true,
                buttonhtml:(
                    <div className="relative text-gray-700 p-3">
                        <button onClick={deleteTerrainDB} className="flex items-center px-4 font-bold text-white bg-red-600 rounded-lg hover:bg-red-500 focus:bg-red-700">Confirm</button>
                    </div>
                )
            });
        }
    };

    async function deleteTerrainDB()
    {
        setDelButton({
            confirmed: true,
            deleted: true,
            buttonhtml:(
                <div className="relative text-gray-700 p-3">
                    <button className="flex items-center px-4 font-bold text-white bg-pink-600 rounded-lg hover:bg-pink-500 focus:bg-pink-700">Deleted</button>
                </div>
            )
        });

        const delTerrain = `
        mutation{
            deleteTerrain(_name:"${terrainname}")
            }
        `;

        let data = await axios.post( "http://localhost:3000/api/terraingeneration", {
            query: delTerrain
        }).then((data, err) => {
            if(err) console.log(err);
            console.log(data);
        });
    };

    return(
        <div className="flex justify-center">
            {delbutton.buttonhtml}
        </div>
    )
}


export default DelButton;