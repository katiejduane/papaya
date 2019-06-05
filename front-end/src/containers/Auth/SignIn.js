import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as actions from '../../store/actions/index';

class SignIn extends Component{
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
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
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const pass = this.state.controls.password.value;
        this.props.onSignIn(email, pass)
    }

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

        ))

        return (
            <div className="AuthFormContainer">
                <h1 className="AuthWelcome">Welcome to Papaya</h1>
                <p className="AuthPlease">Please sign in</p>
                <form className="AuthForm" onSubmit={this.submitHandler}>
                    {form}
                    <Button btnClass="AuthButton" btnType="submit">Submit</Button>
                </form>
                <Button btnClass="SwitchAuth"><Link to='/signup'>Or Sign Up</Link></Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.signIn(email, password))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);