import React from 'react';
import axios from 'axios';

//Elements
import BackButton from '../../components/BackButton';
import DelButton from '../../components/DelButton';

function savedTerrain({ data })
{
    var terrainData = JSON.parse(data);

    let num = 25;

    var map = [];

    for(let i = 0; i < num; i++)
    {
        for(let j = 0; j < num; j++)
        {
            var bgcolor = "";
            var bgstength = "";

            let h = terrainData.heightNoise[i*num + j];
            let b = terrainData.biomeNoise[i*num + j];

            if(h <= 20)
            {
                bgcolor = "blue-";
                bgstength = `${500+ (Math.floor(b/2))*100}`;
            } 
            else if (h <= 30)
            {
                bgcolor = "yellow-";
                bgstength = `100`;
            }
            else if (h <= 75)
            {
                bgcolor = "green-";
                bgstength = `${400+b*100}`;
            } 
            else if (h <= 90)
            {
                bgcolor = "gray-";
                bgstength = `${500-(Math.floor(b/2))*100}`;
            }
            else 
            {
                bgcolor = "gray-200"
                bgstength = ""
            }

            map.push(
                <div className={`h-auto bg-${bgcolor}${bgstength}`} key={`${i}-${j}`}></div>
            );
        }
    }

    return(
        <div className="h-screen w-full bg-gray-700 overflow-hidden">

            <div className="w-full text-2xl flex justify-center text-white">
                    <div className="py-5">
                        {terrainData.name}
                    </div>
            </div>

            <div className="h-5/6 w-full flex justify-center items-center pt-0">

                

                <div className= {`h-4/6 w-1/2 grid grid-cols-${num} gap-0 border-4 border-gray-600`}>
                    {map}
                </div>
            </div>

            <BackButton/>
            <DelButton terrainname={terrainData.name} />
        </div>
    )
}

export async function getServerSideProps(context) {

    async function getTerrain()
    {
        const getTerrainquery = `
            query{
                foundTerrain(name:"${context.params.id}"){
                  name
                  heightNoise
                  biomeNoise
                }
              }
        `;

        return await axios.post( "http://localhost:3000/api/terraingeneration", {
            query: getTerrainquery
        }).then((res, err) => {
            if(err) console.log(err);
            return JSON.stringify(res.data.data.foundTerrain);
        });
    };

    const _terrainData = await getTerrain();

    return {
        props: {
            data: _terrainData
        }
    };
}

export default savedTerrain;