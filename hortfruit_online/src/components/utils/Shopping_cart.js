import React from "react";
import Button from "../layout/button/Button";
import Style from "./Shopping_cart.module.css"

function Shopping_cart(props) {
    const { fruit, removeAction, addAction } = props
    return (
        <div className={Style.fruits_selected}>
            <p>{fruit.name}</p>
            <p className={Style.fruit_quantity}>{fruit.number}</p>
            <div className={Style.quantity_options}>
                <Button
                    id={fruit.name}
                    className={Style.shopping_remove_button}
                    content='-'
                    action={removeAction}
                />
                <Button
                    id={fruit.name}
                    className={Style.shopping_add_button}
                    content='+'
                    action={addAction}
                />
            </div>
        </div>
    )
}

export default Shopping_cart