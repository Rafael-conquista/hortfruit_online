import React from "react";
import { useState, useEffect } from 'react'
import Style from './home.module.css'
import { listFruits } from "../api";
var fruits = []
var selectedFruits = []

function Home(){
    const [loaded, setLoaded] = useState(false)
    const [newSelection, setNewSelection] = useState({})
    const [changes, setChanges] = useState(0)
    const [finishBuying, setFinishBuying] = useState(false)
    init()

    async function init() {
        const resposta = await listFruits()

        for(var i = 0; i <= resposta.data.length -1; i++){
            fruits.push(resposta.data[i])
        }
        fruits.length = 31
        setLoaded(true)
    }

    function addItem (event){
        setNewSelection(selectedFruits)
        let alreadyExists = false
        const el = event.target.id
        for(var i = 0; i < selectedFruits.length; i++){
            if(selectedFruits[i].name === el){
                alreadyExists = true
                const quantidade = selectedFruits[i].number + 1
                selectedFruits[i].number = quantidade
            }
        }
        if(!alreadyExists){
            let shoppingCart = {
                name: el,
                number: 1
            }
            selectedFruits.push(shoppingCart)
        }
        setChanges(changes + 1)
    }

    function removeItem (event){
        const el = event.target.id
        for(var i = 0; i < selectedFruits.length; i++){
            if(selectedFruits[i].name === el){
                if(selectedFruits[i].number > 1){
                    const quantidade = selectedFruits[i].number - 1
                    selectedFruits[i].number = quantidade
                }else{
                    selectedFruits.splice(i,1)
                    
                }
            }
        }
        setChanges(changes + 1)
    }

    function removeAll(){
        for(var i = 0; i<selectedFruits.length + 1; i++){
            selectedFruits.pop()
            setChanges(changes + 1)
        }
        if(selectedFruits.length > 0){
            removeAll()
        }
    }

    function buyButton(){
        if(selectedFruits.length > 0){
            setFinishBuying(true)
            removeAll()
        }
    }

    return(
        <div>
            <body>
                <div  className={Style.welcome_message}>
                    <h1>Bem vindo ao Hortfruit Online!</h1>
                    <h3>Conheça nossos produtos abaixo</h3>
                </div>
                <div className={Style.container_fruits}>
                    <div>
                        {loaded ? <div className={Style.fruits_area}>
                            {fruits.map((fruit, key) =>{
                                return(
                                    <div className={Style.box}>
                                        <h2>{fruit.name}</h2>
                                        <div className={Style.fruit_infos}>
                                            <p>carbohydrates: {fruit.nutritions.carbohydrates}</p>
                                            <p>protein: {fruit.nutritions.protein}</p>
                                            <p>fat: {fruit.nutritions.fat}</p>
                                            <p>calories: {fruit.nutritions.calories}</p>
                                            <p>sugar: {fruit.nutritions.sugar}</p>
                                        </div>
                                        <div className={Style.box_options}>
                                            <div onClick={removeItem} id={fruit.name} className={Style.remove_item}>retirar</div>
                                            <div onClick={addItem} id={fruit.name} className={Style.add_item}>adicionar</div>
                                        </div>
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
                                    {newSelection.map((fruit)=>{
                                        return (
                                            <div className={Style.fruits_selected}>
                                                <p>{fruit.name}</p>
                                                <p className={Style.fruit_quantity}>{fruit.number}</p>
                                                <div className={Style.quantity_options}>
                                                <div onClick={removeItem} id={fruit.name} className={Style.shopping_remove_button}>-</div>
                                                    <div onClick={addItem} id={fruit.name} className={Style.shopping_add_button}>+</div>
                                                </div>
                                            </div>
                                        )
                                    })}  
                                </div>  
                            : ''} 
                                <div className={Style.buy_button} onClick={buyButton}>
                                    <p>Comprar</p>
                                </div>
                            {finishBuying ? <h3 className={Style.thanks_message}>Obrigado por comprar conosco!</h3> : ""}
                    </div>
                        </div>
                </div>

            </body>
        </div>
    )
}

export default Home