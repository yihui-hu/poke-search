import React from "react"
import { useState } from "react"
import Axios from "axios"
import PokeView from "./PokeView"

export default function Main() {
    const [pokemonName, setPokemonName] = useState("")
    // default Pokemon is Grovyle :)
    const [pokemon, setPokemon] = useState({
        name: "GROVYLE",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/253.png",
        type_1: "grass",
        type_2: "nil",
        hp: 50,
        attack: 65, 
        defense: 45,
        special_attack: 85,
        special_defense: 65,
        speed: 95,
    })

    function handleChange(event) {
        setPokemonName(event.target.value)
    }

    function searchPokemon(event) {
        event.preventDefault()
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.trim().toLowerCase()}`)
            .then((response) => {
                // only interested in the data
                setPokemon({
                    name: pokemonName.toUpperCase(),
                    img: response.data.sprites.other['official-artwork'].front_default,
                    type_1: response.data.types[0].type.name,  
                    type_2: response.data.types[1] ? response.data.types[1].type.name : "nil",
                    hp: response.data.stats[0].base_stat,
                    attack: response.data.stats[1].base_stat,
                    defense: response.data.stats[2].base_stat,
                    special_attack: response.data.stats[3].base_stat,
                    special_defense: response.data.stats[4].base_stat,
                    speed: response.data.stats[5].base_stat,
                })
            })
            .catch((error) => {
                // have to catch errors (needed documentation for this one!)
                alert("Sorry! No such Pokémon exists!")
                console.log(error)
            })
    }

    return (
        <div>
            <div className="header">
                <h1>pokéSearch</h1>
                <form>
                    <input 
                        className="input"
                        type="text"
                        name="pokemonName"
                        placeholder="Enter Pokémon's name here..."
                        autocomplete="off"
                        value={pokemonName}
                        onChange={handleChange}
                    />
                    <button
                        className="submit-button"
                        onClick={searchPokemon}
                    >SEARCH</button>
                </form>
            </div>
            <br></br>
            <PokeView pokemon={pokemon}/>
            <br></br>
            <h2>Why Grovyle as the default? It's my favourite Pokémon...</h2>
            <br></br>
        </div>
    )
}