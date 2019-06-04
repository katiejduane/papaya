import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import './Form.css';

class Form extends Component {
    state = {
        error: false,
        loading: false,
        title: '',
        type: '',
        status: '',
        note: '',

    }

    postNew = (event) => {
        event.preventDefault(event)
        this.props.addNewProject(this.state.title, this.state.type, this.state.status, this.state.note)
    }

    changeTitleHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    //this one could prove tricky depending on whether or not its new/previous type
    changeTypeHandler = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    changeStatusHandler = (event) => {
        this.setState({
            status: event.target.value
        })
    }

    changeNotesHandler = (event) => {
        this.setState({
            note: event.target.value
        })
    }


    render(){

        return (
            <div className='FormContainer'>
                <form onSubmit={this.postNew} className="Form">
                    <div className="FormLabel">Title</div>
                    <section>
                        <input type="text" onChange={this.changeTitleHandler} className="TitleInput" 
                            placeholder={this.props.titleholder} maxlength="25" required />
                    </section>
                    <div className="FormLabel">Type</div>
                    <section>
                        <select onChange={this.changeTypeHandler} className="SelectType">
                            <option value=''>{this.props.defaultType}</option>
                            {this.props.typeList}
                        </select>
                        <input type="text" onChange={this.changeTypeHandler} className="NewType"
                            placeholder={this.props.typeholder}  />
                    </section>
                    <div className="FormLabel">Status</div>
                    <section>
                        <select onChange={this.changeStatusHandler} className="SelectStatus" required>
                            <option value=''>{this.props.defaultStatus}</option>
                            {this.props.statusList}
                        </select>
                    </section>
                    <div className="FormLabel">Notes</div>
                    <section>
                        <textarea onChange={this.changeNotesHandler} className="NewNote" 
                            placeholder={this.props.noteholder} value={this.state.note}></textarea>
                    </section>
                    <Button type="submit" btnClass="Submit">Add</Button>
                </form>
            </div>
        )

    }
}

export default Form;
