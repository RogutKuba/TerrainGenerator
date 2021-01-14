import React from 'react'
import axios from 'axios'
import { useQuery, gql } from "@apollo/client";

export default function Kuba({ nameData })
{
    return(
        <div>
            {nameData.name}
            {nameData.age}
            {nameData.count}
        </div>
    )
}

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
      id
      title
      created_at
      is_completed
  }
}`;



export async function getStaticProps()
{
    let response = await axios.get('https://api.agify.io/?name=kuba');

    return {
        props: {
            nameData: response.data
        }
    }
}