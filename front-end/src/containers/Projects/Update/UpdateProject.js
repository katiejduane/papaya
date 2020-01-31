import React, { Component } from "react";
import axios from "../../../axiosInstance";

import { connect } from "react-redux";

import Form from "../../Form/Form";
import Loader from "../../../components/UI/Loader/Loader";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import styles from "../AddNew/NewProject.module.css";

class EditProject extends Component {
  state = {
    projectId: null,
    title: "",
    status: "",
    notes: "",
    type: "",
    dateCreated: "",
    dateUpdated: "",
    color: "",
    loading: true,
    error: false,
    stats: [
      { value: "1", displayValue: "Idea" },
      { value: "2", displayValue: "Research" },
      { value: "3", displayValue: "In-Progress" },
      { value: "4", displayValue: "Revision" },
      { value: "5", displayValue: "Finished" },
      { value: "6", displayValue: "Submitted" },
      { value: "7", displayValue: "Accepted" }
    ]
  };

  componentDidMount() {
    const projId = this.props.match.params.id;
    if (!this.props.types) {
      this.props.getProjectTypes();
    }
    axios({
      method: "GET",
      url: `${window.apiHost}/update/${projId}`
    })
      .then(response => {
        const projectDetails = response.data[0];
        console.log("project: ", projectDetails);
        this.setState({
          title: projectDetails.name,
          status: projectDetails.status.statusname,
          notes: projectDetails.notes,
          type: projectDetails.type.typename,
          dateCreated: projectDetails.createdAt,
          dateUpdated: projectDetails.updatedAt,
          color: projectDetails.status.color,
          projectId: projId,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          loading: false
        });
        console.log(error);
      });
  }

  updateProject = (title, type, status, notes) => {
    const id = this.state.projectId;
    axios({
      method: "POST", //do i want to change this to a put? look in sequelize docs for ideas
      url: `${window.apiHost}/update/${id}`,
      data: {
        id: id,
        name: title,
        type: type,
        status: status,
        notes: notes
      }
    })
      .then(response => {
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
    const typeList = "temp";
    //   this.props.types.length > 0
    //     ? this.props.types.map((type, index) => {
    //         return (
    //           <option key={index + type.id} value={type.id}>
    //             {type.typename}
    //           </option>
    //         );
    //       })
    //     : [];

    const statusList = this.state.stats.map((status, index) => {
      return (
        <option key={index + status.value} value={status.value}>
          {status.displayValue}
        </option>
      );
    });

    let editForm = (
      <Form
        formTitle="Add new idea or project"
        addNewProject={this.addNewProject}
        titleholder={this.state.title}
        //this needs to NOT be placeholder text!
        defaultType={this.state.type}
        typeList={typeList}
        typeholder="Or add a new type..."
        defaultStatus="Choose status"
        statusList={statusList}
        noteholder="Details about your project..."
      />
    );

    if (this.state.loading) {
      editForm = <Loader />;
    }

    return (
      <Aux>
        <h1 className={styles.AddTitle}>
          Enter your new idea or project details
        </h1>
        {editForm}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    types: state.type.types,
    isAuth: state.auth.token !== null,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
