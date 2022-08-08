import React from "react";

function button(props) {
    const { id, className, content, action } = props
    return <div id={id} onClick={action} className={className}>{content}</div>
}

export default button