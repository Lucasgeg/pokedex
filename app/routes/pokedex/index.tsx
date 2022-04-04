import { Link, LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";

import axios from "axios";
const currentPage = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0";

type LoaderData = {
  pokemonList: Array<{ name: string; url: string }>;
  nextLink: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const res = await axios.get(currentPage);
  const pokemonList = res.data.results;
  const nextLink = res.data.next;

  const data: LoaderData = {
    pokemonList,
    nextLink,
  };

  return json(data);
};
export default function Index() {
  const { pokemonList, nextLink } = useLoaderData<LoaderData>();

  return (
    <div className="container">
      <h1>Index</h1>
      <ul>
        {pokemonList.map((p) => (
          <li key={p.name}>
            <Link to={p.name}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
