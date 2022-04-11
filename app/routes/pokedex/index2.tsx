import axios from "axios";
import { Link } from "remix";
import { json, LoaderFunction, useLoaderData } from "remix";

//typage de PokePaginate car next et previousContext contiennent des objets
type PokePaginate = { offset: string | null; limit: string | null };
//on type ce qui sera dans le LoaderData
type LoaderData = {
  //on type les datas qui seront dans le loader
  pokemonList: Array<{ name: string; url: string }>; //un array donc on type aussi ce qui sera dedans
  currentPage: String;
  nextContext: PokePaginate | null;
  previousContext: PokePaginate | null;
};
//fonction pour récupérer les offsets et limit
//si on a une url, la fonction récupère la valeur de limit et de offset
const getPaginInfo = (url: string | null) => {
  if (!url) return null; //  si url == null alors on ne renvoies rien
  const { searchParams } = new URL(url);
  return {
    limit: searchParams.get("limit"),
    offset: searchParams.get("offset"),
  };
};

//le loader est chargé coté serveur donc avant d'avoir un rendu
export const loader: LoaderFunction = async ({
  request /* request sera l'url passé */,
}) => {
  const { searchParams } = new URL(request.url); //on récupère l'url passé en requete et on récupère la méthode searchParams
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const currentPage = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`; //url de l'api
  const {
    data: { results, next, previous },
  } = await axios.get(currentPage); //on destructure pour ne pas avoir à répéter la fonction
  //et on récupère donc results qui = axios.get(currentPage).results etc...
  const pokemonList = results;
  const nextContext = getPaginInfo(next); //on récupère limit et offset de next
  const previousContext = getPaginInfo(previous); // pareil pour previous
  //on sauvegarde dans data de type LoaderData (qui est typé en haut) les const
  //currentPage et pokemonList
  const data: LoaderData = {
    nextContext,
    previousContext,
    currentPage,
    pokemonList,
  };

  return json(data);
};

export default function Index2() {
  //on récupère les data du back
  const { pokemonList, nextContext, previousContext } =
    useLoaderData<LoaderData>(); //useLoaderData récupère data du loader avec le typage de LoaderData

  return (
    <>
      <h1>Index</h1>
      <ul>
        {pokemonList.map((p) => (
          <li key={p.name}>
            <Link to={p.name}>{p.name}</Link>
          </li>
        ))}
      </ul>
      {previousContext && (
        <Link
          to={`/pokedex?limit=${previousContext.limit}&offset=${previousContext.offset}`}
        >
          <button type="submit">Précédent</button>
        </Link>
      )}
      {nextContext && (
        <Link
          to={`/pokedex?limit=${nextContext.limit}&offset=${nextContext.offset}`}
        >
          <button type="submit">Suivant</button>
        </Link>
      )}
    </>
  );
}
