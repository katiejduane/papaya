import React from 'react';

import './DetailCard.css';
import Button from '../../UI/Button/Button'

const DetailCard = (props) => {

    const statusColor = {
        backgroundColor: props.color
    }

    return(
        <div className="DetailCard">
            <h2 className="DetailCard-Title">{props.title}</h2>
            <div className="DetailCard-Type"><strong>Type: </strong>{props.type}</div>
            <div className="DetailCard-Status" style={statusColor}><strong>Status: </strong>{props.status}</div>
            <p className="DetailCard-Notes"><strong>Notes: </strong>{props.notes}</p>
            <div className="CardBtnContainer">
                <Button btnClass="UpdateBtn">Update</Button>
                <Button btnClass="DeleteBtn">Delete</Button>
            </div>
        </div>
    )
}

export default DetailCard;