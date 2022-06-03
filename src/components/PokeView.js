import React from "react"
import Types from "./Types"
import Stats from "./Stats"

export default function PokeView(props) {
    let mon = props.pokemon

    return (
        <div className="pokeview row">
            <div className="column left">
                <h1 className="pokemonName">{mon.name}</h1>
                <img src={mon.img} />
                <Types type_1={mon.type_1} type_2={mon.type_2}/>
            </div>
            <div className="stats column right">
                <Stats stats={mon} />
            </div>
        </div>
    )
}