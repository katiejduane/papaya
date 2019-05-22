import React, { Component } from 'react';
import axios from 'axios';

import './NewProject.css'
// import Input from '../../../components/UI/Input/Input';
// import Loader from '../../../components/UI/Loader/Loader';
import Button from '../../../components/UI/Button/Button';


class NewProject extends Component {
    state = {
        loading: true,
        error: false,
        types: [],
        stats: [
            // not sure this will work as the DB already has these, wish i could pull the list from
            // db but i can't seem to do it while ALSO loading the types list from db...
            { value: '1', displayValue: 'Idea' },
            { value: '2', displayValue: 'Research' },
            { value: '3', displayValue: 'In-Progress' },
            { value: '4', displayValue: 'Revision' },
            { value: '5', displayValue: 'Finished' },
            { value: '6', displayValue: 'Submitted' },
            { value: '7', displayValue: 'Accepted' }
        ]
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

        //then to redirect this.props.history.push...
    }

    checkNewType(event, value){
        event.preventDefault();
        
    }

    inputChangedHandler(event, inputIdentifier, value){
        
    }

    render(){

        // let addForm = (
        //     <form onSubmit={this.addNewHandler}>
        //         {addFormElements.map(formElem => (
        //             <Input
        //                 key={formElem.id}
        //                 style={formElem.style}
        //                 label={formElem.config.elemLabel}
        //                 className={formElem.config.elemClass}
        //                 elemType={formElem.config.elemType}
        //                 elemConf={formElem.config.elemConf}
        //                 value={formElem.config.value}
        //                 invalid={!formElem.config.valid}
        //                 shouldValidate={formElem.config.validation}
        //                 touched={formElem.config.touched}
        //                 changed={event => this.inputChangedHandler(event, formElem.id, formElem.config.value)}
        //             />
        //         ))}
        //         <Button btnType="Submit" btnClass="Submit" disabled={!this.state.formIsValid}>Add</Button>

        //     </form>
        // );
      
        // if(this.state.loading){
        //     addForm = <Loader />
        // }

        return(
            <div className="AddFormContainer">
                <h1 className="AddTitle">Enter your new idea or project details</h1>
                {/* {addForm} */}
            </div>
        );
    }
}

export default NewProject;