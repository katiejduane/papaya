import React, { Component } from "react";
import axios from "../../../axiosInstance";
import { connect } from "react-redux";

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
    this.props.getProjectTypes();
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
        //if response.status === 200??
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // do i need an if statement here checking the length of the types state/props?
    // probably, and if it's < 1, make a drop down with the 'create new' option and nada mas
    const typeList = this.props.types.map(type => {
      return (
        <option key={type.id} value={type.id}>
          {type.typename}
        </option>
      );
    });
    typeList.push(<option value="new">"Add new project type"</option>);
    // i will need to something like the above line to make sure i can also have this option so they can create a new val
    // i wonder if i could do the above thing ONCE and then pass it around? i use it here, in main nav, and in editProject

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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    types: state.type.types,
    isAuth: state.auth.token !== null
    // loading: state.auth.loading //not sure i'll need loading here as i have it in local state? idk look into this!
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectTypes: () => dispatch(actions.getProjectTypes())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
