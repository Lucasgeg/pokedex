import { Link, LoaderFunction } from "remix";
import { json, useLoaderData } from "remix";
import axios from "axios";

type PokePagination = { offset: string | null; limit: string | null };
type LoaderData = {
  pokemonList: Array<{ name: string; url: string }>;
  currentPage: String;
  nextContext: PokePagination | null;
  previousContext: PokePagination | null;
};

const getPaginationInfo = (url: string | null) => {
  if (!url) return null;
  const { searchParams } = new URL(url);
  return {
    offset: searchParams.get("offset"),
    limit: searchParams.get("limit"),
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const currentPage = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const {
    data: { results, next, previous },
  } = await axios.get(currentPage);
  const pokemonList = results;

  const nextContext = getPaginationInfo(next);
  const previousContext = getPaginationInfo(previous);

  const data: LoaderData = {
    currentPage,
    pokemonList,
    nextContext,
    previousContext,
  };

  return json(data);
};

export default function Index() {
  const { pokemonList, nextContext, previousContext, currentPage } =
    useLoaderData<LoaderData>();
  console.log({ nextContext, previousContext });

  /*  const [nextPageUrl, setNextPageUrl]= useState()
  const [prevPageUrl, setPrevPageUrl]= useState()

  useEffect(()=>{
    axios.get(currentPageUrl).then(res=>{
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
    })
  }) */

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
      {previousContext && (
        <Link
          to={`/pokedex?offset=${previousContext.offset}&limit=${previousContext.limit}`}
        >
          Précédent
        </Link>
      )}

      {nextContext && (
        <Link
          to={`/pokedex?offset=${nextContext.offset}&limit=${nextContext.limit}`}
        >
          Suivant
        </Link>
      )}
    </div>
  );
}
