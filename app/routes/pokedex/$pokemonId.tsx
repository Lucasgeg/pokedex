import axios from "axios";
import clsx from "clsx";
import { Router } from "react-router-dom";
import { json, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
type Pokemon = {
  name: string;
  id: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
  abilities: [{ ability: { name: string } }];
  height: number;
  weight: number;
};

type LoaderData = {
  pokemonDetail: Pokemon;
};
export const loader: LoaderFunction = async ({ params }) => {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
  );
  const pokemonDetail: Pokemon = res.data;
  const data: LoaderData = {
    pokemonDetail,
  };
  return json(data);
};

export default function PokemonById() {
  const { pokemonDetail } = useLoaderData<LoaderData>();
  function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const numberOfTypes = pokemonDetail.types.length;
  const numberOfAbilities = pokemonDetail.abilities.length;
  const handlePrev = () => {
    return history.back();
  };

  return (
    <>
      <div
        className=" w-fit bg-amber-200 p-1 text-center my-3 border-2 border-white/25 rounded-lg cursor-pointer"
        onClick={handlePrev}
      >
        Previous
      </div>
      <div className="border-8 border-red-600 rounded-full w-full header  bg-orange-200 text-lg mb-3 p-3 md:mt-24">
        <h1 className="text-center ">
          Individual page of : <br />
          <span
            className={
              "font-bold text-2xl name" + pokemonDetail.types[0].type.name
            }
          >
            {capitalizeWord(pokemonDetail.name)}
          </span>
        </h1>
      </div>
      {/* Carte du Pokemon */}
      <div
        className={clsx(
          "card rounded-3xl border-[10px] border-white/25 grid grid-cols-12 p-3 m-3 ",
          pokemonDetail.types[0].type.name
        )}
      >
        <img
          src={pokemonDetail.sprites.other.dream_world.front_default}
          alt={"Picture of " + pokemonDetail.name}
          className="col-span-12 mx-auto md:col-span-4"
        />

        <table className="col-span-12 sm:col-start-1 sm:col-span-4 sm:mb-6 md:col-span-3 ">
          <thead className="">
            <tr className="exeption">
              <th colSpan={2} className=" h-14">
                Specific Informations
              </th>
            </tr>
          </thead>
          <tbody className="  ">
            <tr className="">
              <th>ID:</th>
              <td>{pokemonDetail.id}</td>
            </tr>
            {pokemonDetail.types.map((type, index) => (
              <tr key={index}>
                <th>Type {numberOfTypes > 1 ? index + 1 : ""}:</th>
                <td className="first-letter:uppercase">{type.type.name}</td>
              </tr>
            ))}
            <tr>
              <th>Heigh:</th>
              <td>{pokemonDetail.height}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{pokemonDetail.weight}</td>
            </tr>
          </tbody>
        </table>
        <table className="col-span-12 sm:col-end-13 sm:col-span-4 md:col-span-3 md:col-end-13">
          <thead className="">
            <tr className="exeption ">
              <th colSpan={2} className="h-14">
                Basic Abilities
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemonDetail.abilities.map((ability, index) => (
              <tr key={index}>
                <th>Ability {numberOfAbilities > 1 ? index + 1 : ""}</th>
                <td className="first-letter:uppercase">
                  {ability.ability.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
