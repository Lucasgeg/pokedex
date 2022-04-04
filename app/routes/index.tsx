import { Link } from "remix";

export default function index(){
  return(
    <div className="container">
      <h1>Pokedex</h1>
      <Link to="pokedex">Attrapez les tous!</Link>
    </div>
  )
}