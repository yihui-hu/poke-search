import React from "react"
import { useState, useEffect } from "react"
import Types from "./Types"
import axios from "axios"

export default function PokemonCard(props) {

    let {id, name, img, type_1, type_2} = props.data

    return (
        <div className="pokemonCard">
            <div id={id}>
                <h3>ID: {id}</h3>
            </div>
            <h2 id={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <img src={img} id={id}/>
            <p></p><br></br>
            <Types type_1={type_1} type_2={type_2} id={id}/>
            <br></br>
        </div>
    )
}