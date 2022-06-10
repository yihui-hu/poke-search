import React from "react"
import { useState, useEffect } from "react"
import PokeView from "./PokeView"
import Info from "./Info"
import AllPokemon from "./AllPokemon"
import PokemonCard from "./PokemonCard"
import PokemonCards from "./PokemonCards"
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

    let [viewAll, setViewAll] = useState(false)

    function calculateOffset(id) {
        let offset = Math.floor(id/20) * 20
        return offset
    }

    function toggleViewAll() {
        setViewAll(!viewAll)
    }

    const [allPokemon, setAllPokemon] = useState([])
    const [current, setCurrent] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${calculateOffset(pokemon.id)}`)

    async function getAllPokemon(url) {
        let response = await axios.get(url)
        let data = await response.data
        let results = await data.results

        let array = []
        results.forEach(async (pokemonData) => {
            let response2 = await axios.get(pokemonData.url)
            let data2 = await response2.data
                
            let mon = {
                id: data2.id,
                name: data2.name,
                type_1: data2.types[0].type.name,
                type_2: data2.types[1] ? data2.types[1].type.name : "nil",
                img: data2.sprites.other['official-artwork'].front_default,
            }
            array.push(mon)
        })

        // array.sort((a,b) => 
        //     a.id - b.id
        // )

        setAllPokemon(array)
    }

    useEffect(() => {
        getAllPokemon(current)
    }, [current])

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

            setCurrent(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${calculateOffset(pokemon.id)}`)

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
        // window.scroll(0, 180)
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

            setCurrent(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${calculateOffset(pokemon.id)}`)

            setErrorMessage("")
        } catch(error) {
            // catching errors (needed documentation for this one!)
            setErrorMessage("Sorry! Unable to retrieve previous Pokémon.")
            console.log(error)
        }
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        // window.scroll(0, 180)
    }

    async function setSinglePokemon(event) {
        //get pokemon id
        let id = event.target.id

        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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

        setCurrent(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${calculateOffset(pokemon.id)}`)
        console.log(current)

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        toggleViewAll()
    }

    function renderPokemonCards() {
        return (
            <>
                {/* <h2 className="allPageNo">Page No.</h2> */}
                {allPokemon.map((pokemon) => 
                    <div key={pokemon.id} onClick={setSinglePokemon}>
                        <PokemonCard data={pokemon}/>
                    </div>)}   
            </>
        )
    }

    async function searchNextAll() {
        let firstDigit
        for (let i = current.length; i > 0; i--) {
            if (current[i] === "=") {
                firstDigit = i + 1
                break
            }
        }

        let newOffset = parseInt(current.substring(firstDigit, current.length)) + 20
        if (newOffset <= 880) {
            let newURL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${newOffset}`
            setCurrent(newURL)
            let response = await axios.get(newURL)
            let data = await response.data

            let array = []
            data.results.forEach(async (pokemonData) => {
                let response2 = await axios.get(pokemonData.url)
                let data2 = await response2.data
                
                let mon = {
                    id: data2.id,
                    name: data2.name,
                    type_1: data2.types[0].type.name,
                    type_2: data2.types[1] ? data2.types[1].type.name : "nil",
                    img: data2.sprites.other['official-artwork'].front_default,
                }
                array.push(mon)
            })
            setAllPokemon(array)
        }
    }

    async function searchPrevAll() {
        let response = await axios.get(current)
        let data = await response.data
        let prev = await data.previous
        setCurrent(prev)
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
            {/* <AllPokemon pokemon={pokemon}/> */}
            <button
                className="navigation right"
                style={{ float: "right" }}
                onClick={viewAll ? searchNextAll : searchNext}
            >{`next ▶`}</button>
            <button
                className="navigation left"
                style={{ float: "left" }}
                onClick={viewAll ? searchPrevAll : searchPrev}
            >{`◀ prev`}</button>

            <div className="toggleView" onClick={toggleViewAll}>{viewAll ? "" : "All"}</div>
            {!viewAll && <PokeView pokemon={pokemon} />}
            {/* {viewAll && renderPokemonCards()} */}
            {viewAll && <PokemonCards allPokemon={allPokemon} />}

            <h2 className="footer">Made with data from <a href="https://pokeapi.co/">PokéAPI. </a> 
            View project on <a href="https://github.com/yihui-hu/poke-search">GitHub.</a></h2>
            <br></br>
            <br></br>
            <button
                className="navigation rightbottom"
                style={{ float: "right" }}
                onClick={viewAll ? searchNextAll : searchNext}
            >{`next ▶`}</button>
            <button
                className="navigation leftbottom"
                style={{ float: "left" }}
                onClick={viewAll ? searchPrevAll : searchPrev}
            >{`◀ prev`}</button>
        </div>
    )
}