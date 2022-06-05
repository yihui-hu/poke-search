import React from "react"
import Types from "./Types"
import Stats from "./Stats"
import Abilities from "./Abilities"
import Evolutions from "./Evolutions"
import PokedexEntry from "./PokedexEntry.js"

export default function PokeView(props) {
    let mon = props.pokemon

    return (
        <div className="pokeview">
            <div className="row">
                <div className="column nametype-column">
                    <h1 style={{letterSpacing: "0.2rem"}}>{mon.name}</h1>
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
            <div>
                <h1 style={{letterSpacing: "0.3rem", textAlign: "center"}}>POKÉDEX ENTRY</h1>
                <PokedexEntry name={mon.name} />
            </div>
            <div>
                <h1 style={{letterSpacing: "0.3rem", textAlign: "center"}}>EVOLUTION(S)</h1>
                <Evolutions name={mon.name} />
            </div>
        </div>
    )
}