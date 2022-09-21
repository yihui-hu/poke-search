import React from "react"

export default function Types(props) {

    // make each type capitalised
    let type_1 = props.type_1.charAt(0).toUpperCase() + props.type_1.slice(1)
    let type_2 = props.type_2.charAt(0).toUpperCase() + props.type_2.slice(1)

    function determineColor(type) {
        if (type === "Grass") {
            return "https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg"

        } else if (type === "Water") {
            return "https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg"

        } else if (type === "Fire") {
            return "https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg"

        } else if (type === "Normal") {
            return "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg"

        } else if (type === "Electric") {
            return "https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg"

        } else if (type === "Ice") {
            return "https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg"

        } else if (type === "Fighting") {
            return "https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg"

        } else if (type === "Poison") {
            return "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg"

        } else if (type === "Ground") {
            return "https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg"

        } else if (type === "Flying") {
            return "https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg"

        } else if (type === "Psychic") {
            return "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg"
            
        } else if (type === "Bug") {
            return "https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg"
            
        } else if (type === "Rock") {
            return "https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg"
            
        } else if (type === "Ghost") {
            return "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg"
            
        } else if (type === "Dragon") {
            return "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg"
            
        } else if (type === "Dark") {
            return "https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg"
            
        } else if (type === "Steel") {
            return "https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg"
            
        } else if (type === "Fairy") {
            return "https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg"
            
        } else {
            return "https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg"
        }
    }
    
    return (
        <span className="typesIcon">
            <img src={determineColor(type_1)} />
            {type_2 !== "Nil" && <img src={determineColor(type_2)} />}
        </span>
    )
}