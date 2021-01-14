import React, { useState } from 'react';
import perlin from 'perlin-noise'

//Elements
import SaveButton from '../components/SaveButton';
import NewButton from '../components/NewButton';

let num = 25;

function RandomTerrain({ saved, heightNoise, biomeNoise })
{
    var map = [];
    var newheightNoise = []
    var newbiomeNoise = []

    var _wassaved = saved;

    function setSaved()
    {
        _wassaved = true;
    }

    for(let i = 0; i < num; i++)
    {
        for(let j = 0; j < num; j++)
        {
            newheightNoise[i*num + j] = Math.floor(heightNoise[i*num + j] * 100);
            newbiomeNoise[i*num + j] = Math.floor(biomeNoise[i*num + j] * 4);

            var bgcolor = "";
            var bgstength = "";

            let h = newheightNoise[i*num + j];
            let b = newbiomeNoise[i*num + j];

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
        <div className="h-screen w-full bg-gray-700 ">

            <div className="h-5/6 w-full flex justify-center items-center">
                <div className= {`h-4/6 w-1/2 grid grid-cols-${num} gap-0 border-4 border-gray-600`}>
                    {map}
                </div>
            </div>
            
            <div className="p-10">
                <SaveButton saveFunc={setSaved} _saved={_wassaved} _heightNoise={newheightNoise} _biomeNoise={newbiomeNoise}/>
            </div>
        </div>
    )
}

export async function getStaticProps() {

    const heightData = perlin.generatePerlinNoise(num, num)
    const biomeData = perlin.generatePerlinNoise(num, num)

    return {
        props: { saved: false, heightNoise: heightData, biomeNoise: biomeData }
    }
}

export default RandomTerrain;