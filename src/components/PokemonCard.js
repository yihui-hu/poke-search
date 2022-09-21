import React from "react"
import { useState, useEffect } from "react"
import TypesSmall from "./TypesSmall"
import axios from "axios"

export default function PokemonCard(props) {

    let {id, name, img, type_1, type_2} = props.data
    let infoShown = props.showInfo

    return (
        <div className="pokemonCard">
            {infoShown && <h3>#{id}</h3>}
            {infoShown && <h2 id={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>}
            <img src={img} id={id}/>
            {infoShown && <><p></p>
            <TypesSmall type_1={type_1} type_2={type_2} id={id}/>
            <br></br>
            <br></br>
            <br></br>
            </>}
        </div>
    )
}