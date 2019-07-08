import React, { Component } from "react";
import axios from "../../../axiosInstance";

import styles from "./NewProject.module.css";
// import Input from '../../../components/UI/Input/Input';
import Loader from "../../../components/UI/Loader/Loader";
import Form from "../../Form/Form";
import Aux from "../../../hoc/Aux/Aux";

class NewProject extends Component {
  state = {
    loading: true,
    error: false,
    types: [],
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
    axios({
      method: "GET",
      url: `/addNew`
    })
      .then(response => {
        this.setState({ loading: false });
        let typeArray = response.data.map(type => {
          return { value: type.id, displayValue: type.typename };
        });
        typeArray.push({ value: "new", displayValue: "Add new type" });
        // console.log(typeArray)
        this.setState({
          types: typeArray
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        console.log(error);
      });
  }

  addNewProject = (title, type, status, notes) => {
    axios({
      method: "POST",
      url: `/addNew`,
      data: {
        name: title,
        type: type,
        status: status,
        notes: notes
      }
    })
      .then(response => {
        // console.log(response)
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // do i need an if statement here checking the length of the types state?
    const typeList = this.state.types.map(type => {
      return (
        <option key={type.id} value={type.value}>
          {type.displayValue}
        </option>
      );
    });
    const statusList = this.state.stats.map(status => {
      return (
        <option key={status.id} value={status.value}>
          {status.displayValue}
        </option>
      );
    });

    let addForm = (
      <Form
        formTitle="Add new idea or project"
        addNewProject={this.addNewProject}
        titleholder="Project title"
        defaultType="Choose type"
        typeList={typeList}
        typeholder="Or add a new type..."
        defaultStatus="Choose status"
        statusList={statusList}
        noteholder="Details about your project..."
      />
    );

    if (this.state.loading) {
      addForm = <Loader />;
    }

    return (
      <Aux>
        <h1 className={styles.AddTitle}>
          Enter your new idea or project details
        </h1>
        {addForm}
      </Aux>
    );
  }
}

export default NewProject;
