import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./Form.module.css";
import DropDown from "../../components/UI/Dropdown/DropDown";

class Form extends Component {
  state = {
    error: false,
    loading: false,
    title: "",
    type: "",
    status: "",
    note: ""
  };

  postNew = event => {
    event.preventDefault(event);
    this.props.addNewProject(
      this.state.title,
      this.state.type,
      this.state.status,
      this.state.note
    );
  };

  updateCurrent = event => {
    event.preventDefault(event);
    this.props.updateProject(
      this.state.title,
      this.state.type,
      this.state.status,
      this.state.note
    );
  };

  changeTitleHandler = event => {
    this.setState({
      title: event.target.value
    });
  };

  changeTypeHandler = event => {
    this.setState({
      type: event.target.value
    });
  };

  changeStatusHandler = event => {
    this.setState({
      status: event.target.value
    });
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
        <form onSubmit={this.postNew} className={styles.Form}>
          <div className={styles.FormLabel}>Title</div>
          <section>
            <input
              type="text"
              onChange={this.changeTitleHandler}
              className={styles.TitleInput}
              placeholder={this.props.titleholder}
              maxLength="25"
              required
            />
          </section>
          <div className={styles.FormLabel}>Type</div>
          <section>
            <DropDown
              selectClass={styles.SelectType}
              defaultVal="new"
              defaultDisplayVal={this.props.defaultType}
              change={this.changeTypeHandler}
              vals={this.props.typeList}
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
            <DropDown
              selectClass={styles.SelectStatus}
              defaultVal="1"
              defaultDisplayVal={this.props.defaultStatus}
              change={this.changeStatusHandler}
              vals={this.props.statusList}
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
            Add
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
