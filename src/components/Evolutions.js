import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"


export default function Evolutions(props) {

    let mon = props.name.toLowerCase()
    let backup_name = mon
    mon = mon.split('-')[0]
    let dummy = [
        {
            id: 1,
            name: "unknown",
            img: "https://upload.wikimedia.org/wikipedia/commons/4/46/Question_mark_%28black%29.svg"
        },
        {
            id: 2,
            name: "nil",
            img: "nil"
        },
        {
            id: 3,
            name: "nil",
            img: "nil"
        }
    ]

    let [evolution, setEvolution] = useState([
        {
            id: 1,
            name: "treecko",
            img: "nil"
        },
        {
            id: 2,
            name: "grovyle",
            img: "nil"
        },
        {
            id: 3,
            name: "sceptile",
            img: "nil"
        }
    ])

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${mon}`)
            .then((response) => {
                axios.get(response.data.evolution_chain.url)
                    .then((response) => {
                        let data = response.data.chain
                        getData(data)
                    })
            })
            .catch((error) => {
                setEvolution(dummy)
                console.log(error)
            })
    }, [mon])

    async function getData(data) {
        let stage1 = data.species.name
        let stage2 = data.evolves_to.length !== 0 ? data.evolves_to[0].species.name : "nil"
        let stage3 = "nil"
    
        if (data.evolves_to.length !== 0) {
            if (data.evolves_to[0].evolves_to.length !== 0) {
                stage3 = data.evolves_to[0].evolves_to[0].species.name
            }
        }

        let img1, img2, img3
        let response

        try {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage1}`)
            img1 = response.data.sprites.front_default
        } catch {
            try {
                // for pesky pokemon forms like giratina...
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${backup_name}`)
                img1 = response.data.sprites.front_default
            } catch {
                setEvolution(dummy)
            }
        }
        
        if (stage2 != "nil") {
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage2}`)
                img2 = response.data.sprites.front_default
            } catch {
                setEvolution(dummy)
            }
        }

        if (stage3 != "nil") {
            try {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage3}`)
                img3 = response.data.sprites.front_default
            } catch {
                setEvolution(dummy)
            }
        }

        let evo = 
        [
            {
                id: 1,
                name: `${stage1.charAt(0).toUpperCase() + stage1.slice(1)}`,
                img: `${img1 != undefined ? img1 : `https://upload.wikimedia.org/wikipedia/commons/4/46/Question_mark_%28black%29.svg`}`
            },
            {
                id: 2,
                name: `${stage2.charAt(0).toUpperCase() + stage2.slice(1)}`,
                img: `${img2 != undefined ? img2 : `https://upload.wikimedia.org/wikipedia/commons/4/46/Question_mark_%28black%29.svg`}`
            },
            { 
                id: 3,
                name: `${stage3.charAt(0).toUpperCase() + stage3.slice(1)}`,
                img: `${img3 != undefined ? img3 : `https://upload.wikimedia.org/wikipedia/commons/4/46/Question_mark_%28black%29.svg`}`
            }
        ]

        setEvolution(evo)
    }

    function renderEvoChain() {
        return evolution.map((stage) => {

            if (stage.name !== "Nil") {
                return (
                    <div key={stage.id} className="column evolutions">
                        <h1>{stage.name}</h1>
                        <img src={stage.img} />
                    </div>
                )
            }
        })
    }

    return (
        <div className="row 2 customRow">
            {renderEvoChain()}
        </div>
    )
}