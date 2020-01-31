import React from "react";
import { Link } from "react-router-dom";

import styles from "./DetailCard.module.css";
import Button from "../../UI/Button/Button";

const DetailCard = props => {
  const statusColor = {
    backgroundColor: props.color
  };

  return (
    <div className={styles.DetailCard}>
      <h2 className={styles.DetailCardTitle}>{props.title}</h2>
      <div className={styles.DetailCardType}>
        <strong>Type:</strong> {props.type}
      </div>
      <div className={styles.DetailCardStatus} style={statusColor}>
        <strong>Status:</strong> {props.status}
      </div>
      <p className={styles.DetailCardNotes}>
        <strong>Notes: </strong>
        {props.notes}
      </p>
      <div className={styles.DateHolder}>
        <span className={styles.DateCreated}>
          <strong>Created:</strong> {props.dateCreated}
        </span>
        <span className={styles.DateUpdated}>
          <strong>Updated:</strong> {props.dateUpdated}
        </span>
      </div>
      <div className={styles.CardBtnContainer}>
        <Button btnClass="UpdateBtn">
          <Link to={`/update/${props.view}`}>Update</Link>
        </Button>
        <Button btnClass="DeleteBtn">
          <Link to={`/delete/${props.view}`}>Delete</Link>
        </Button>
      </div>
    </div>
  );
};

export default DetailCard;
