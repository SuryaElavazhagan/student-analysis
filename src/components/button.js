import React from 'react'
const Button = (props) => {
    const buttonStyle = {display: 'inline-block',padding: '10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: 'white', margin: '10px 10px'}
    const imgStyle = { marginRight: '5px',width: '16px', height: '16px' }
    return(
        <span style={ buttonStyle }>
            <img style={ imgStyle } src={ props.icon } alt={ props.title }/>
            { props.title }
        </span>
    )
}

export default Button