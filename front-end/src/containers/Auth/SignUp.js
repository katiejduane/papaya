import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class SignUp extends Component {
  state = {
    controls: {
      firstname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      lastname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Last name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    const firstname = this.state.controls.firstname.value;
    const lastname = this.state.controls.lastname.value;
    const email = this.state.controls.email.value;
    const pass = this.state.controls.password.value;
    this.props.onSignUp(firstname, lastname, email, pass);
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElem => (
      <Input
        key={formElem.id}
        elementType={formElem.config.elementType}
        elementConfig={formElem.config.elementConfig}
        value={formElem.config.value}
        invalid={!formElem.config.valid}
        shouldValidate={formElem.config.validation}
        touched={formElem.config.touched}
        changed={event => this.inputChangedHandler(event, formElem.id)}
      />
    ));

    return (
      <div className={styles.AuthFormContainer}>
        <h1 className={styles.AuthWelcome}>Welcome to Papaya</h1>
        <p className={styles.AuthPlease}>Please sign up</p>
        <form className={styles.AuthForm} onSubmit={this.submitHandler}>
          {form}
          <Button btnClass="AuthButton" btnType="submit">
            Sign Up
          </Button>
        </form>
        <Button btnClass="SwitchAuth">
          <Link to="/signin">Or Sign In</Link>
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstname, lastname, email, password) =>
      dispatch(actions.signUp(firstname, lastname, email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
