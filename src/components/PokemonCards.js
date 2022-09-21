import React from "react"
import { useState, useEffect } from "react"
import Types from "./Types"
import axios from "axios"

export default function PokemonCards(props) {

    let allPokemon = props.allPokemon

    // let array

    // allPokemon.forEach(async (pokemonData) => {
    //     let response = await axios.get(pokemonData.url)
    //     let data = await response.data

    //     let mon = {
    //         id: data.id,
    //         name: data.name,
    //         type_1: data.types[0].type.name,
    //         type_2: data.types[1] ? data.types[1].type.name : "nil",
    //         img: data.sprites.other['official-artwork'].front_default,
    //     }
    //     array.push(mon)
    // })

    return (
        <>
            {allPokemon.map((pokemon) =>
                <div key={pokemon.id}>
                    <div className="pokemonCard">
                        <div id={pokemon.id}>
                            <h3>ID: {pokemon.id}</h3>
                        </div>
                        <h2 id={pokemon.id}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                        <img src={pokemon.img} id={pokemon.id} />
                        <p></p><br></br>
                        <Types type_1={pokemon.type_1} type_2={pokemon.type_2} id={pokemon.id} />
                        <br></br>
                    </div>
                </div>)}
        </>
    )
}