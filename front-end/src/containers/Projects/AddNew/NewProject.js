import React, { Component } from 'react';
import axios from 'axios';

import './NewProject.css'
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import Button from '../../../components/UI/Button/Button';

class NewProject extends Component {
    state = {
        addProjectForm: {
            title: {
                elemLabel: 'Title',
                elemType: 'input',
                elemClass: 'input-title',
                elemConf: {
                    type: 'text',
                    placeholder: 'Idea or project title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            type: {
                elemLabel: 'Choose type',
                elemType: 'select',
                elemClass: 'select-prev-type',
                elemConf: {
                    options: []
                },
                value: 'select',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            newType: {
                elemLabel: 'Or, add a new type',
                elemType: 'input',
                elemClass: 'select-old-type',
                elemConf: {
                    type: 'text',
                    placeholder: 'Add new project type'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            color: {
                elemLabel: 'Choose a color for a new type',
                elemType: 'select',
                elemClass:'select-color',
                elemConf: {
                    options: [
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
                value: 'papayawhip',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            status: {
                elemLabel: 'Set status',
                elemType: 'select',
                elemClass: 'select-status',
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
                validation: {
                    require: true
                },
                valid: false,
                touched: false
            },
            notes: {
                elemLabel: 'Add notes',
                elemType: 'textarea',
                elemClass: 'text-notes',
                elemConf: {
                    placeholder: 'Add notes about your idea/project here. Materials, research, etc...'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false,
        types: [],
    };

    

    componentDidMount(){
        axios.get(`${window.apiHost}/addNew`)
            .then((response) => {
                console.log(response.data)
                let typeArray = response.data.map(type => {
                    return {value : type.typename, displayValue : type.typename}
                }) 
                // console.log(typeArray)
                // console.log(this.state.addProjectForm.status.elemConf.options)
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
                // console.log(this.state.addProjectForm.type.elemConf.options)
            })
            .catch((error => {
                this.setState({
                    error: true
                })
                console.log(error)
            }))
    }

    addNewHandler(){

        //then to redirect this.props.history.push...
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        return isValid;
    }

    inputChangedHandler(event, inputIdentifier){
        // console.log(inputIdentifier);
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
        
        this.setState({ addProjectForm: updatedAddProjectForm, formIsValid: formIsValid });
    
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
                        label={formElem.config.elemLabel}
                        className={formElem.config.elemClass}
                        elemType={formElem.config.elemType}
                        elemConf={formElem.config.elemConf}
                        value={formElem.config.value}
                        invalid={!formElem.config.valid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        changed={event => this.inputChangedHandler(event, formElem.id)}
                    />
                ))}
                <Button btnType="Submit" disabled={!this.state.formIsValid}>Add</Button>

            </form>
        );

        if(this.state.addProjectForm.type.elemConf.options === 0){
            this.state.loading = true;
        } else {
            this.state.loading = false;
        }

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