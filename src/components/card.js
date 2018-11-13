import React from 'react';
import '../style/card.css';

const Card = (props) => (
    <div className="card" onClick={props.onClick}>
        <div className="card-header">{props.header}</div>
        <div className="card-description">{props.description}</div>
    </div>
)

export default Card;