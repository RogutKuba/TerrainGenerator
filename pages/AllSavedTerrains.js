import React from 'react';
import axios from 'axios';
import Link from 'next/link'

var AllSavedTerrains = function({ listofTerrains })
{
    var terrainList;

    if(listofTerrains != null)
    {
        terrainList = JSON.parse(listofTerrains).map((elem, index) => {
            return(
                <Link key={index} href={`/terrain/[id]`} as={`/terrain/${elem.name}`}>
                    <div className="text-lg block flex justify-center pt-3">{elem.name}</div>
                </Link>
            );
        });
    }
    
    return(
        <div className="h-screen w-full bg-gray-700 flex justify-center items-center text-white">
            <div className="flex-col h-5/6 w-1/2 bg-gray-600 border-2 border-gray-900">
                <div className="w-full flex justify-center pt-5">
                    <div className="block text-3xl pb-10">All Saved Terrains</div>
                </div>
                
                <div className="w-full flex justify-center">
                    <div className="w-full flex-col">
                        {terrainList}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export async function getServerSideProps() {

    async function getList()
    {
        const getAllTerrains = `
            query{
                allTerrains{
                  name
                }
              }
        `;

        return await axios.post( "http://localhost:3000/api/terraingeneration", {
            query: getAllTerrains
        }).then((res, err) => {
            if(err) console.log(err);
            return JSON.stringify(res.data.data.allTerrains);
        });
    };

    const data = await getList();

    return {
        props: { listofTerrains: data}
    };
}

export default AllSavedTerrains;