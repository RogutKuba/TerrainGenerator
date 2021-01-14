import React from 'react';
import axios from 'axios'


function Name({ nameData })
{
    return(
        <div>
            {nameData.name}
            {nameData.age}
            {nameData.count}
        </div>
    )
}

export async function getStaticPaths() {

    const all_names = ['Kacper', 'Patrick']

    const paths = all_names.map((cur_name) => ({
        params: { id: cur_name },
    }));

    return { paths, fallback: false}
}

export async function getStaticProps({ params }) {

    let response = await axios.get(`https://api.agify.io/?name=${params.id}`);

    return {
        props: {
            nameData: response.data
        }
    }
}


export default Name;