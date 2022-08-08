import React from 'react'
const Icon = (props: any) => {
    const icon = require(`../../../assets/Shared/icons/${props.name}.svg`)
    return (
        <img src={icon} width="24" height="24" />
    )
}

export default Icon