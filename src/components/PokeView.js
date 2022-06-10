import React from "react"
import Types from "./Types"
import Stats from "./Stats"
import Abilities from "./Abilities"
import Evolutions from "./Evolutions"
import PokedexEntry from "./PokedexEntry"
import Moves from "./Moves"
import FunFacts from "./FunFacts"

export default function PokeView(props) {
    let mon = props.pokemon

    return (
        <div className="pokeview">
            <div className="row">
                <div className="column nametype-column">
                    <h1 className="monName">{mon.name}</h1>
                    <img className="monImg" src={mon.img} />
                    <Types type_1={mon.type_1} type_2={mon.type_2}/>
                </div>
                <div className="column stats-column">
                    <Stats stats={mon} />
                </div>
                <div className="column abilities-column">
                    <Abilities abilities={mon.abilities} />
                </div>
            </div>
            <PokedexEntry id={mon.id} />
            <div>
                <h1 className="title">EVOLUTION(S)</h1>
                <Evolutions name={mon.name} />
            </div>
            <Moves name={mon.name} />
            <FunFacts name={mon.name} hp={mon.hp}/>
        </div>
    )
}