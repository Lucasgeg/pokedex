import axios from "axios";
import clsx from "clsx";
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
  const numberOfAbilities = pokemonDetail.abilities.length;

  return (
    <div className="">
      <div className="border-2 rounded-full header relative w-[33vw] h-[15vh] top-[15vh] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1 className=" text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Individual page of : <br />
          <span>{capitalizeWord(pokemonDetail.name)}</span>
        </h1>
      </div>
      {/* Carte du Pokemon */}
      <div
        className={clsx(
          "card rounded-3xl border-[10px] border-white/25 absolute w-[75vw] h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex",
          pokemonDetail.types[0].type.name
        )}
      >
        <img
          src={pokemonDetail.sprites.other.dream_world.front_default}
          alt={"Picture of " + pokemonDetail.name}
          className=" w-1/5 "
        />
        <div className="infos w-4/5 flex justify-around">
          <table className="w-1/3 h-1/2 relative top-1/2 -translate-y-1/2 ">
            <thead>
              <tr className="exeption">
                <th colSpan={2}>Specific Informations</th>
              </tr>
            </thead>
            <tbody className=" ">
              <tr>
                <th>ID:</th>
                <td>{pokemonDetail.id}</td>
              </tr>
              {pokemonDetail.types.map((type, index) => (
                <tr key={index}>
                  <th>Type {index + 1}:</th>
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
          <table className="w-1/3 h-1/2 relative top-1/2 -translate-y-1/2 ">
            <thead>
              <tr className="exeption">
                <th colSpan={2}>Basic Abilities</th>
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
          {/* <h3 className=" mt-3 text-center">Specific details</h3>
          <div className="w-full flex justify-around">
            <div className="left border-2 w-1/3">
              <ul>
                <li></li>
              </ul>
            </div>
            <div className="right border-2 w-1/3"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
