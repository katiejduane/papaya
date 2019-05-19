import React, { Component } from 'react';
import axios from 'axios';

import './NewProject.css'
// import Input from '../../../components/UI/Input/Input';

class NewProject extends Component {
    state = {
        addProjectForm: {
            title: {
                elemType: 'input',
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
                elemType: 'select',
                elemConf: {},
                value: 'select',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }, 
            newType: {
                elemType: 'input',
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
            status: {
                elemType: 'select',
                elemConf: {
                    options: [
                        { value: 'idea', displayValue: 'Idea' },
                        { value: 'in-progress', displayValue: 'In Progress' },
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
                elemType: 'textarea',
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
        types: [],
        error: false
    }

    componentDidMount(){
        axios.get(`${window.apiHost}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    types: response.data
                })
            })
            .catch((error => {
                this.setState({
                    error: true
                })
                console.log(error)
            }))
    }

    addNew(){

    }

    checkValidity(){

    }

    inputChangedHandler(){

    }

    render(){
        return(
            <h1>getting there...</h1>
        )
    }
}

export default NewProject;