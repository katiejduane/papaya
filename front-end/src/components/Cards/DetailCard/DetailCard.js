import React from 'react';

import './DetailCard.css';
import Button from '../../UI/Button/Button'

const DetailCard = (props) => (
    <div className="DetailCard">
        <h3 className="DetailCard-Title">{props.title}</h3>
        <div className="DetailCard-Type">{props.type}</div>
        <div className="DetailCard-Status">{props.status}</div>
        <p className="DetailCard-Notes">{props.notes}</p>
        <Button btnClass="UpdateBtn">Update</Button>
        <Button btnClass="DeleteBtn">Delete</Button>
    </div>
)

export default DetailCard;