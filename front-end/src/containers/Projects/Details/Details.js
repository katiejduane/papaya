import React, { Component } from "react";
// import axios from "axios";
import axios from "../../../axiosInstance";
import { Link } from "react-router-dom";

import styles from "./Details.module.css";
import DetailCard from "../../../components/Cards/DetailCard/DetailCard";
import Button from "../../../components/UI/Button/Button";

class Details extends Component {
  state = {
    id: "",
    title: "",
    status: "",
    notes: "",
    type: "",
    dateCreated: "",
    dateUpdated: "",
    color: "",
    error: false
  };

  componentDidMount() {
    const projId = this.props.match.params.id;
    axios({
      method: "GET",
      url: `${window.apiHost}/view/${projId}`
    })
      .then(response => {
        const projectDetails = response.data[0];
        // console.log(projectDetails);
        this.setState({
          id: projectDetails.id,
          title: projectDetails.name,
          status: projectDetails.status.statusname,
          notes: projectDetails.notes,
          type: projectDetails.type.typename,
          dateCreated: projectDetails.createdAt,
          dateUpdated: projectDetails.updatedAt,
          color: projectDetails.status.color
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        console.log(error);
      });
  }

  destroyProject = () => {
    const projId = this.state.id;
    axios({
      method: "POST", //do i want to change this to a put? look in sequelize docs for ideas
      url: `/delete/${projId}`,
      data: {
        id: projId
      }
    })
      .then(response => {
        console.log("DELETE RES: ", response);
        if (response.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: true
        });
      });
  };

  render() {
    const humanizedDateCreated = new Date(
      this.state.dateCreated
    ).toLocaleDateString();
    const humanizedDateUpdated = new Date(
      this.state.dateUpdated
    ).toLocaleDateString();

    return (
      <div className={styles.DetailCardContainer}>
        <DetailCard
          title={this.state.title}
          status={this.state.status}
          notes={this.state.notes}
          type={this.state.type}
          color={this.state.color}
          dateCreated={humanizedDateCreated}
          dateUpdated={humanizedDateUpdated}
          view={this.state.id}
          destroyProject={this.destroyProject}
        />
        <Link to="/">
          <Button btnClass="GeneralButton">Back</Button>
        </Link>
      </div>
    );
  }
}

export default Details;
