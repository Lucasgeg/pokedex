import type { LoaderFunction } from "remix"
import { json, useLoaderData } from "remix"
import axios from "axios"
import { useState } from "react"

type LoaderData={
    pokemonList: Array<{name:string, url:string, id:number, type: string }>
    moreList: string,  
    all: string,  
}

const pokemonUrl='https://pokeapi.co/api/v2/pokemon?limit=20';


export const loader:LoaderFunction=async({request})=>{
    


    const res = await axios.get(pokemonUrl);
    const moreList = res.data.next;
    const pokemonList = res.data.results;
    const all = await pokemonList.url;

    const data: LoaderData = {
        all,
        moreList,
        pokemonList
    }
    return json(data)
}
export default function Index2(){
    const {pokemonList, moreList, all} =useLoaderData<LoaderData>();
    const [allPokemon, setAllPokemon]=useState([])
    const [loadMore, setLoadMore]=useState([pokemonUrl])
    console.log(all);
      
    return (
        <div className="">
            <h1>Pokemon List</h1>
            <div className="pokemonCard">
                <ul>
                    {pokemonList.map(p=>
                    <li key={p.name}>{p.name}
                    </li>)}
                </ul>
            </div>
            <button>Get more</button>
        </div>
    )
}