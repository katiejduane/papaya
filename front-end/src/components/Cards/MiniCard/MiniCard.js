import React from 'react';
import { Link } from 'react-router-dom';

import './MiniCard.css';
import Button from '../../UI/Button/Button'

const miniCard = (props) => (
    <div className="MiniCard">
        <h3 className="MiniCard-Title">{props.title}</h3>
        <div className="MiniCard-Type">{props.type}</div>
        <div className="MiniCard-Status">{props.status}</div>
        <Button btnClass="MiniCardBtn"><Link to={"/view/" + props.view}>View</Link></Button>
    </div>
)

export default miniCard;