import axios from "axios";
import type { LoaderFunction } from "remix";
import { json, Link, useLoaderData, useParams } from "remix";

type LoaderData = {
  pokemon: {
    abilities: [{ ability : {name : string} }];
    name: string;
    sprites:{ other: {dream_world: {front_default: string}} };
  };
};
export const loader: LoaderFunction = async ({ params }) => {
    
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
  );
  const pokemon = res.data;  
  const data: LoaderData = {
    pokemon,
  };
  return data;
};

export default function PokemonById() {
  const {pokemon} = useLoaderData<LoaderData>();
  console.log(pokemon.sprites.other.dream_world.front_default);
    
  return (
    <div className="container">
      <h1>Individual page of {pokemon.name}</h1>
      {pokemon?.sprites?.other?.dream_world?.front_default
       ? (
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      ) : null}
      <h2>Capacité de base:</h2>
      <ul>
        {pokemon?.abilities.map((cap) => (
          <li key={cap.ability.name}>{cap.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}
