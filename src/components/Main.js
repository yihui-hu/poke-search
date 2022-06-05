import React from "react"
import { useState } from "react"
import PokeView from "./PokeView"
import axios from "axios"

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
        abilities: [{ ability: { name: "Overgrow" } }, { ability: { name: "Unburden" } }],
        id: 253
    })

    function handleChange(event) {
        setPokemonName(event.target.value)
    }

    let [errorMessage, setErrorMessage] = useState("")

    async function searchPokemon(event) {
        event.preventDefault()
        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.trim().toLowerCase()}`)
            let mon = response.data

            setPokemon({
                name: mon.name.toUpperCase(),
                img: mon.sprites.other['official-artwork'].front_default,
                type_1: mon.types[0].type.name,
                type_2: mon.types[1] ? mon.types[1].type.name : "nil",
                hp: mon.stats[0].base_stat,
                attack: mon.stats[1].base_stat,
                defense: mon.stats[2].base_stat,
                special_attack: mon.stats[3].base_stat,
                special_defense: mon.stats[4].base_stat,
                speed: mon.stats[5].base_stat,
                abilities: mon.abilities,
                id: mon.id
            })

            setErrorMessage("")
        } catch(error) {
            // catching errors (needed documentation for this one!)
            setErrorMessage("Sorry! No such Pokemon exists.")
            console.log(error)
        }
    }

    async function searchNext(event) {
        event.preventDefault()
        let newID = pokemon.id + 1
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${newID}`)
        let newName = response.data.name

        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newName.trim().toLowerCase()}`)
            let mon = response.data

            setPokemon({
                name: mon.name.toUpperCase(),
                img: mon.sprites.other['official-artwork'].front_default,
                type_1: mon.types[0].type.name,
                type_2: mon.types[1] ? mon.types[1].type.name : "nil",
                hp: mon.stats[0].base_stat,
                attack: mon.stats[1].base_stat,
                defense: mon.stats[2].base_stat,
                special_attack: mon.stats[3].base_stat,
                special_defense: mon.stats[4].base_stat,
                speed: mon.stats[5].base_stat,
                abilities: mon.abilities,
                id: mon.id
            })

            setErrorMessage("")
        } catch(error) {
            // catching errors (needed documentation for this one!)
            setErrorMessage("Sorry! No such Pokemon exists.")
            console.log(error)
        }
    }

    async function searchPrev(event) {
        event.preventDefault()
        let newID = pokemon.id - 1
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${newID}`)
        let newName = response.data.name

        try {
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newName.trim().toLowerCase()}`)
            let mon = response.data

            setPokemon({
                name: mon.name.toUpperCase(),
                img: mon.sprites.other['official-artwork'].front_default,
                type_1: mon.types[0].type.name,
                type_2: mon.types[1] ? mon.types[1].type.name : "nil",
                hp: mon.stats[0].base_stat,
                attack: mon.stats[1].base_stat,
                defense: mon.stats[2].base_stat,
                special_attack: mon.stats[3].base_stat,
                special_defense: mon.stats[4].base_stat,
                speed: mon.stats[5].base_stat,
                abilities: mon.abilities,
                id: mon.id
            })

            setErrorMessage("")
        } catch(error) {
            // catching errors (needed documentation for this one!)
            setErrorMessage("Sorry! No such Pokemon exists.")
            console.log(error)
        }
    }

    return (
        <div>
            <div className="header">
                {/* <h1>
                    <span>
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" />
                    pokéSearch
                    </span>
                </h1> */}
                <h1>pokéSearch</h1>
                <input
                    className="input"
                    placeholder="Enter Pokémon's name here..."
                    autoComplete="off"
                    value={pokemonName}
                    onChange={handleChange}
                />
                <button
                    className="submit"
                    onClick={searchPokemon}
                >SEARCH</button>
                {errorMessage !== "" && <h4>{errorMessage}</h4>}
            </div>
            <button
                className="navigation right"
                style={{ float: "right" }}
                onClick={searchNext}
            >{`next ▶`}</button>
            <button
                className="navigation left"
                style={{ float: "left" }}
                onClick={searchPrev}
            >{`◀ prev`}</button>
            <br></br>
            <PokeView pokemon={pokemon} />
            <br></br>
            {/* <h2 className="footer">Why Grovyle is set as the default entry? It's my favourite Pokémon...</h2> */}
            <h2 className="footer">{``}</h2>
            <br></br>
        </div>
    )
}