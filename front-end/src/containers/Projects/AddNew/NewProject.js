import React, { Component } from 'react';
import axios from 'axios';

import './NewProject.css'
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import Button from '../../../components/UI/Button/Button';
import { type } from 'os';
import { Z_BLOCK } from 'zlib';

class NewProject extends Component {
    state = {
        addProjectForm: {
            title: {
                elemLabel: 'Title',
                elemType: 'input',
                elemClass: 'Input-Title',
                elemConf: {
                    type: 'text',
                    placeholder: 'Idea or project title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                style: {display: 'block'}
            }, 
            type: {
                elemLabel: 'Choose type',
                elemType: 'select',
                elemClass: 'Select-Prev-Type',
                elemConf: {
                    options: []
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }, 
            newType: {
                elemLabel: '',
                elemType: 'input',
                elemClass: 'Select-New-Type',
                elemConf: {
                    type: 'text',
                    placeholder: 'Add new project type'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false,
                style: { display: 'none' }
            },
            color: {
                elemLabel: '',
                elemType: 'select',
                elemClass: 'Select-Color',
                elemConf: {
                    options: [
                        { value: '', displayValue: 'Select one' },
                        { value: 'papayawhip', displayValue: 'Papaya Whip' },
                        { value: 'palegoldenrod', displayValue: 'Goldenrod' },
                        { value: 'lightsalmon', displayValue: 'Coral' },
                        { value: 'palevioletred', displayValue: 'Violet Red' },
                        { value: 'mistyrose', displayValue: 'Misty Rose' },
                        { value: 'lavenderblush', displayValue: 'Cool Blush' },
                        { value: 'lavender', displayValue: 'Lavender' },
                        { value: 'lightblue', displayValue: 'Light Blue' },
                        { value: 'paleturquoise', displayValue: 'Turquoise' },
                        { value: 'mintcream', displayValue: 'Mint Cream' },
                    ]
                },
                value: '',
                validation: {},
                valid: true,
                touched: false,
                style: { display: 'none' }
            },
            status: {
                elemLabel: 'Set status',
                elemType: 'select',
                elemClass: 'Select-Status',
                elemConf: {
                    options: [
                        { value: 'idea', displayValue: 'Idea' },
                        { value: 'research', displayValue: 'Research' },
                        { value: 'in-progress', displayValue: 'In-Progress' },
                        { value: 'revision', displayValue: 'Revision' },
                        { value: 'finished', displayValue: 'Finished' },
                        { value: 'submitted', displayValue: 'Submitted' },
                        { value: 'accepted', displayValue: 'Accepted' },
                    ]
                },
                value: 'idea',
                validation: {},
                valid: true,
                touched: false,
                style: {display: 'block'}
            },
            notes: {
                elemLabel: 'Add notes',
                elemType: 'textarea',
                elemClass: 'Text-Notes',
                elemConf: {
                    placeholder: 'Add notes about your idea/project here. Materials, research, etc...'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                style: { display: 'block' }
            }
        },
        formIsValid: false,
        loading: true
    };

    // I WANT TO COME BACK AND DO PROPER VALIDATION FOR THIS FORM AT SOME POINT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    componentDidMount(){
        axios.get(`${window.apiHost}/addNew`)
            .then((response) => {
                this.setState({loading: false})
                let typeArray = response.data.map(type => {
                    return {value : type.id, displayValue : type.typename}
                }) 
                typeArray.push({ value: 'new', displayValue: 'Add new type' })
                // how will i conditionally render the 'add new type' input elements if the above is selected??
                this.setState({
                    addProjectForm: {
                        ...this.state.addProjectForm,
                        type: {
                            ...this.state.addProjectForm.type,
                            elemConf: {
                                ...this.state.addProjectForm.type.elemConf,
                                options: typeArray
                                    }
                                }
                            }
                    })
                this.setState({
                    addProjectForm: {
                        ...this.state.addProjectForm,
                        type: {
                            ...this.state.addProjectForm.type,
                            value: typeArray[0].value
                        }
                    }
                })
                // console.log(this.state)
            })
            .catch((error => {
                this.setState({
                    error: true
                })
                console.log(error)
            }))
    }

    addNewHandler = event => {
        event.preventDefault();
        const addFormData = {};
        for(let formElement in this.state.addProjectForm){
            addFormData[formElement] = this.state.addProjectForm[formElement].value
        }
        axios
            .post(`${window.apiHost}/addNew`, addFormData)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })

        //then to redirect this.props.history.push...
    }

    checkNewType(event, value){
        event.preventDefault();
        console.log(event, value)
        //  I can't figure out how to conditionally render this part of the form...
        //  it enters some kind of an infinite loop type situation...
        let conditionalDisplay = {
            display: 'block'
        }

        if (value === 'new') {
            console.log('new')
            this.setState({
                addProjectForm: {
                    ...this.state.addProjectForm,
                    newType: {
                        ...this.state.addProjectForm.newType,
                        style: conditionalDisplay
                    }
                }
            })
            this.setState({
                addProjectForm: {
                    ...this.state.addProjectForm,
                    color: {
                        ...this.state.addProjectForm.color,
                        style: conditionalDisplay
                    }
                }
            })
        }
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        return isValid;
    }

    inputChangedHandler(event, inputIdentifier, value){
        console.log(inputIdentifier, value)
        let conditionalDisplay = {
            display: 'block'
        }

        const updatedAddProjectForm = {
            ...this.state.addProjectForm
        };
        const updatedFormElement = {
            ...updatedAddProjectForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedAddProjectForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedAddProjectForm) {
            formIsValid = updatedAddProjectForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ addProjectForm : updatedAddProjectForm, formIsValid: formIsValid });

        // this doesn't work... for some reason the value isn't being read as new until after you
        // you click on it, and then it cannot be changed again back to anything else (ie poetry)
        // even when it does register as new, it doesn't change the display of the elements below...
        // if (value === 'new') {
        //     console.log('new')
        //     this.setState({
        //         addProjectForm: {
        //             ...this.state.addProjectForm,
        //             newType: {
        //                 ...this.state.addProjectForm.newType,
        //                 style: conditionalDisplay
        //             }
        //         }
        //     })
        //     this.setState({
        //         addProjectForm: {
        //             ...this.state.addProjectForm,
        //             color: {
        //                 ...this.state.addProjectForm.color,
        //                 style: conditionalDisplay
        //             }
        //         }
        //     })
        // }
    }

    render(){

        let addFormElements = [];
        for(let key in this.state.addProjectForm){
            addFormElements.push({
                id: key,
                config: this.state.addProjectForm[key]
            });
        }

        let addForm = (
            <form onSubmit={this.addNewHandler}>
                {addFormElements.map(formElem => (
                    <Input
                        key={formElem.id}
                        style={formElem.style}
                        label={formElem.config.elemLabel}
                        className={formElem.config.elemClass}
                        elemType={formElem.config.elemType}
                        elemConf={formElem.config.elemConf}
                        value={formElem.config.value}
                        invalid={!formElem.config.valid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        // onChange={event => this.checkNewType(event, formElem.value)}
                        changed={event => this.inputChangedHandler(event, formElem.id, formElem.config.value)}
                    />
                ))}
                <Button btnType="Submit" btnClass="Submit" disabled={!this.state.formIsValid}>Add</Button>

            </form>
        );
      
        if(this.state.loading){
            addForm = <Loader />
        }

        return(
            <div className="AddFormContainer">
                <h1 className="AddTitle">Enter your new idea or project details</h1>
                {addForm}
            </div>
        );
    }
}

export default NewProject;