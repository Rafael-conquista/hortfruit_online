import React from "react";
import Button from "../layout/button/Button";
import Style from "./Fruit_card.module.css"

function Fruits_card(props) {
    const { fruit, addAction, removeAction } = props
    console.log(props)
    return (
        <>
            <h2>{fruit.name}</h2>
            <div className={Style.fruit_infos}>
                <p>carbohydrates: {fruit.nutritions.carbohydrates}</p>
                <p>protein: {fruit.nutritions.protein}</p>
                <p>fat: {fruit.nutritions.fat}</p>
                <p>calories: {fruit.nutritions.calories}</p>
                <p>sugar: {fruit.nutritions.sugar}</p>
            </div>
            <div className={Style.box_options}>
                <Button
                    id={fruit.name}
                    className={Style.remove_item}
                    content='Remover'
                    action={removeAction}
                />
                <Button
                    id={fruit.name}
                    className={Style.add_item}
                    content='Adicionar'
                    action={addAction}
                />
            </div>
        </>
    )
}

export default Fruits_card