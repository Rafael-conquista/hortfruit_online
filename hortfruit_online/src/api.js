import React, { useState } from "react"
import axios from "axios"

export async function listFruits() {
    const res = await axios.get('http://localhost:8000/fruits')
    return res
}


