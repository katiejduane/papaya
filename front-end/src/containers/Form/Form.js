import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./Form.module.css";
import Select from "../../components/UI/Dropdown/Select";

class Form extends Component {
  state = {
    error: false,
    loading: false,
    title: "",
    type: "",
    typeId: "",
    status: "",
    statusId: "",
    note: ""
  };

  componentDidMount() {
    console.log("FORM PROPS", this.props);
    if (this.props.editableValues) {
      console.log("editing");
      this.setState({
        title: this.props.editableValues.title,
        status: this.props.defaultStatusId,
        type: this.props.defaultTypeId,
        note: this.props.editableValues.note
      });
    }
  }

  submitProject = event => {
    event.preventDefault(event);
    this.props.addProject(
      this.state.title,
      this.state.type,
      this.state.status,
      this.state.note
    );
  };

  // updateCurrent = event => {
  //   event.preventDefault(event);
  //   this.props.updateProject(
  //     this.state.title,
  //     this.state.type,
  //     this.state.status,
  //     this.state.note
  //   );
  // };

  changeTitleHandler = event => {
    this.setState({
      title: event.target.value
    });
  };

  changeTypeHandler = event => {
    this.setState({
      type: event.target.value
    });
    console.log("TYPE: ", this.state.type);
  };

  changeStatusHandler = event => {
    this.setState({
      status: event.target.value
    });
    console.log("STATUS: ", this.state.status);
  };

  changeNotesHandler = event => {
    this.setState({
      note: event.target.value
    });
  };

  render() {
    // do i need two way binding here with values set to this.state? it's working as is, without it...
    return (
      <div className={styles.FormContainer}>
        <form onSubmit={this.submitProject} className={styles.Form}>
          <div className={styles.FormLabel}>Title</div>
          <section>
            <input
              type="text"
              onChange={this.changeTitleHandler}
              value={this.state.title}
              text={this.props.titleVal}
              className={styles.TitleInput}
              placeholder={this.props.titleholder}
              maxLength="25"
              required
            />
          </section>
          <div className={styles.FormLabel}>Type</div>
          <section>
            <Select
              selectClass={styles.SelectType}
              defaultVal={this.props.defaultTypeId}
              defaultDisplayVal={this.props.defaultType}
              change={this.changeTypeHandler}
              vals={this.props.typeList}
              value={this.state.type}
            />
            <input
              type="text"
              onChange={this.changeTypeHandler}
              className={styles.NewType}
              placeholder={this.props.typeholder}
            />
          </section>
          <div className={styles.FormLabel}>Status</div>
          <section>
            <Select
              selectClass={styles.SelectStatus}
              defaultVal={this.props.defaultStatusId}
              defaultDisplayVal={this.props.defaultStatus}
              change={this.changeStatusHandler}
              vals={this.props.statusList}
              value={this.state.status}
            />
          </section>
          <div className={styles.FormLabel}>Notes</div>
          <section>
            <textarea
              onChange={this.changeNotesHandler}
              className={styles.NewNote}
              placeholder={this.props.noteholder}
              value={this.state.note}
            />
          </section>
          <Button type="submit" btnClass="Submit">
            {this.props.btnText}
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
