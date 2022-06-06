import React from "react"
import { useState } from "react"
import PokeView from "./PokeView"
import Info from "./Info"
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
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.trim().toLowerCase()}`)
            let url = response.data.varieties[0].pokemon.url
            response = await axios.get(url)
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
            } catch {
                // catching errors (needed documentation for this one!)
                setErrorMessage("Sorry! No such Pokemon exists.")
                console.log(error)
            }
        }
    }

    async function searchNext(event) {
        event.preventDefault()
        let newID = pokemon.id + 1
        let response
        try {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${newID}`)
        } catch {
            setErrorMessage("Sorry! Unable to retrieve next Pokémon.")
            return
        }
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
            setErrorMessage("Sorry! Unable to retrieve next Pokémon.")
            console.log(error)
        }
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    async function searchPrev(event) {
        event.preventDefault()
        let newID = pokemon.id - 1
        let response
        try {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${newID}`)
        } catch {
            setErrorMessage("Sorry! Unable to retrieve previous Pokémon.")
            return
        }
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
            setErrorMessage("Sorry! Unable to retrieve previous Pokémon.")
            console.log(error)
        }
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <div className="header">
                <Info />
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
            {/* <h2 className="footer">Why Grovyle as the default entry? It's my favourite Pokémon...</h2> */}
            {/* <h2 className="footer">{`Made with <3 by Yihui`}</h2> */}
            <h2 className="footer">Made with data from <a href="https://pokeapi.co/">PokéAPI. </a> 
            View project on <a href="https://github.com/yihui-hu/poke-search">GitHub.</a></h2>
            <br></br>
            <button
                className="navigation rightbottom"
                style={{ float: "right" }}
                onClick={searchNext}
            >{`next ▶`}</button>
            <button
                className="navigation leftbottom"
                style={{ float: "left" }}
                onClick={searchPrev}
            >{`◀ prev`}</button>
        </div>
    )
}