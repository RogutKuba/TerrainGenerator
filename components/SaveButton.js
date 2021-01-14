import React, { useState } from 'react';
import axios from 'axios';

function SaveButton( props )
{

    var textinput = "";
 
    const [savebutton, setSaveButton] = useState({
        saved: false,
        buttonhtml: (
                <div className="relative text-gray-700">
                    <input onChange={updateText} className="h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg border-2 border-gray-800 focus:shadow-outline" type="text" placeholder="Name"/>
                    <button onClick={saveTerrain} className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-blue-600 rounded-r-lg hover:bg-blue-500 focus:bg-blue-700">Save</button>
                </div>
        )
    });

    function updateText(e)
    {
        textinput = e.target.value;
    }

    function saveTerrain()
    {
        if(!savebutton.saved)
        {
            props.saveFunc();

            console.log('saving terrain');

            saveTerrainDB()
        }
    }

    async function saveTerrainDB()
    {
        console.log('trying to save ' + textinput)

            const saveTerrainquery = `
            mutation{
                newTerrain(_name:"${textinput}", _heightNoise:[${props._heightNoise}], _biomeNoise:[${props._biomeNoise}])
              }
            `;

            await axios.post( "http://localhost:3000/api/terraingeneration", {
                query: saveTerrainquery
            }).then((data, err) => {
                if(err) console.log(err);
                console.log(data.data.data);

                if(data.data.data.newTerrain == "Inserted")
                {
                    setSaveButton({
                        saved: true,
                        buttonhtml:(
                                <div className="relative text-gray-700">
                                    <input className="h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg border-2 border-gray-800 focus:shadow-outline" type="text" placeholder="Name"/>
                                    <button className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-green-600 rounded-r-lg hover:bg-green-500 focus:bg-green-700">Saved</button>
                                </div>
                        )
                    });
                } else {
                    setSaveButton({
                        saved: true,
                        buttonhtml:(
                                <div className="relative text-gray-700">
                                    <input onChange={updateText} className="h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg border-2 border-gray-800 focus:shadow-outline" type="text" placeholder="Name"/>
                                    <button onClick={saveTerrain} className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-red-600 rounded-r-lg hover:bg-red-500 focus:bg-red-700">Name Taken</button>
                                </div>
                        )
                    });
                }

            });
    }

    return(
        <div className="flex justify-center">
            {savebutton.buttonhtml}
        </div>
    )
}

export default SaveButton;