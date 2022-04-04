import axios from "axios";

const urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"

export async function getAll(){
    const res= await axios.get(urlPokemon)
    return res
}
export async function next() {
    const res = await axios.get(urlPokemon)
    const next = res.data.next

    return next
}