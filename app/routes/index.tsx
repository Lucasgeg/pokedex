import { Link } from "remix";
import "~/styles/pokedex.css";

export default function index() {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-solid">Pokedex</h1>
      <Link to="pokedex" className="font-pokemon">
        Attrapez les tous!
      </Link>
    </div>
  );
}
