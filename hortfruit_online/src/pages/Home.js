import React from "react";
import { useState, useEffect } from 'react'
import Style from './home.module.css'
import { listFruits } from "../api";
import Button from '../components/layout/button/Button'
import FruitsCard from "../components/utils/Fruits_card";
import ShoppingCart from "../components/utils/Shopping_cart"
var fruits = []
var selectedFruits = []

function Home() {
    const [loaded, setLoaded] = useState(false)
    const [newSelection, setNewSelection] = useState({})
    const [changes, setChanges] = useState(0)
    const [finishBuying, setFinishBuying] = useState(false)
    init()

    async function init() {
        const resposta = await listFruits()

        for (var i = 0; i <= resposta.data.length - 1; i++) {
            fruits.push(resposta.data[i])
        }
        fruits.length = 31
        setLoaded(true)
    }

    function addItem(event) {
        setNewSelection(selectedFruits)
        let alreadyExists = false
        const el = event.target.id
        for (var i = 0; i < selectedFruits.length; i++) {
            if (selectedFruits[i].name === el) {
                alreadyExists = true
                const quantidade = selectedFruits[i].number + 1
                selectedFruits[i].number = quantidade
            }
        }
        if (!alreadyExists) {
            let shoppingCart = {
                name: el,
                number: 1
            }
            selectedFruits.push(shoppingCart)
        }
        setChanges(changes + 1)
    }

    function removeItem(event) {
        const el = event.target.id
        for (var i = 0; i < selectedFruits.length; i++) {
            if (selectedFruits[i].name === el) {
                if (selectedFruits[i].number > 1) {
                    const quantidade = selectedFruits[i].number - 1
                    selectedFruits[i].number = quantidade
                } else {
                    selectedFruits.splice(i, 1)

                }
            }
        }
        setChanges(changes + 1)
    }

    function removeAll() {
        for (var i = 0; i < selectedFruits.length + 1; i++) {
            selectedFruits.pop()
            setChanges(changes + 1)
        }
        if (selectedFruits.length > 0) {
            removeAll()
        }
    }

    function buyButton() {
        if (selectedFruits.length > 0) {
            setFinishBuying(true)
            removeAll()
        }
    }

    return (
        <div>
            <body>
                <div className={Style.welcome_message}>
                    <h1>Bem vindo ao Hortfruit Online!</h1>
                    <h3>Conheça nossos produtos abaixo</h3>
                </div>
                <div className={Style.container_fruits}>
                    <div>
                        {loaded ? <div className={Style.fruits_area}>
                            {fruits.map((fruit, key) => {
                                return (
                                    <div className={Style.box}>
                                        <FruitsCard
                                            fruit={fruit}
                                            addAction={addItem}
                                            removeAction={removeItem}
                                        />
                                    </div>
                                )
                            })}
                        </div> : <p>Loading Fruits</p>}
                    </div>
                    <div className={Style.box_shopping_cart}>
                        <h1>Shopping Cart</h1>
                        <div className={Style.items_quantity}>
                            <h3>Items</h3>
                            <h3>Quantity</h3>
                            <div className={Style.remove_all} onClick={removeAll}>Remove All</div>
                        </div>
                        <div>
                            {changes > 0 ?
                                <div>
                                    {newSelection.map((fruit) => {
                                        return (
                                            <ShoppingCart
                                                fruit={fruit}
                                                removeAction={removeItem}
                                                addAction={addItem}
                                            />
                                        )
                                    })}
                                </div>
                                : ''}
                            <Button
                                className={Style.buy_button}
                                id=""
                                content="Comprar"
                                action={buyButton}
                            />
                            {finishBuying ? <h3 className={Style.thanks_message}>Obrigado por comprar conosco!</h3> : ""}
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Home