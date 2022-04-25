import { Link } from "remix";
import "~/styles/pokedex.css";

export default function index() {
  return (
    <div className="container">
      <h1 className="font-solid">Pokedex</h1>
      <Link to="pokedex" className="font-pokemon">
        Attrapez les tous!
      </Link>
    </div>
  );
}
