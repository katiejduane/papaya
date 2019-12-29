import React, { Component } from "react";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";

import styles from "./NewProject.module.css";
// import Input from '../../../components/UI/Input/Input';
import Loader from "../../../components/UI/Loader/Loader";
import Form from "../../Form/Form";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";

class NewProject extends Component {
  state = {
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
    if (!this.props.types) {
      this.props.getProjectTypes();
    }
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
        if (response.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const typeList =
      this.props.types.length > 0
        ? this.props.types.map((type, index) => {
            return (
              <option key={index + type.id} value={type.id}>
                {type.typename}
              </option>
            );
          })
        : [];

    const statusList = this.state.stats.map((status, index) => {
      return (
        <option key={index + status.value} value={status.value}>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
