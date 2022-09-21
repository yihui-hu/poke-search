import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function SmogonInfo(props) {

    let mon = props.name.toLowerCase()
    let name = mon.charAt(0).toUpperCase() + mon.slice(1);

    let [modal, setModal] = useState(false)

    let [stats, setStats] = useState({
        tier: "nil",
        rank: 0,
        usage: "0%",
        abilities: {
            one: "nil",
            two: "nil",
            three: "nil"
        },
        items: {
            one: "nil",
            two: "nil",
            three: "nil"
        },
        moves: {
            one: "nil",
            two: "nil",
            three: "nil",
            four: "nil"
        },
        teammates: {
            one: "nil",
            two: "nil",
            three: "nil"
        }
    })

    function toggleModal() {
        setModal(!modal)
    }

    return (
        <div className="smogon">
            <h1 className="title"><span>SMOGON FACTS<button className="smogon-info" onClick={toggleModal}>ⓘ</button></span></h1>
            {stats.tier !== "nil" && <h2>{name} belongs in the {stats.tier} tier.</h2>}
            <br></br>
            <br></br>
            {modal && <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h2>What is Smogon?</h2>
                        <p><a href="https://www.smogon.com" target="blank">Smogon</a> is a community dedicated to competitive Pokémon play. 
                            They maintain a database of the competitive merits of every Pokémon, move and item.
                        </p>
                        <h2>What are Smogon tiers?</h2>
                        <p>Smogon's tier system is used to rank Pokemon into several groups based on their 
                            perceived power and usage in competitive play. 
                            Learn more <a href="https://www.smogon.com/bw/articles/bw_tiers" target="blank">here</a>!
                        </p>
                        <button className="close-modal" onClick={toggleModal}>×
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}