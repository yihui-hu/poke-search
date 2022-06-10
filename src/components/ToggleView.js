import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function ToggleView() {

    let [viewAll, setViewAll] = useState(false)

    function toggleViewAll() {
        setViewAll(!viewAll)
    }

    return (
        <div className="toggleView" onClick={toggleViewAll}>{viewAll ? "All" : "-"}</div>
    )
}