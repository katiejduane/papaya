import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Details.css';
import DetailCard from '../../../components/Cards/DetailCard/DetailCard';
import Button from '../../../components/UI/Button/Button'

class Details extends Component {
    state = {
        title: '',
        status: '',
        notes: '',
        type: '',
        dateCreated: '',
        color: '',
        error: false
    }

    componentDidMount() {
        const projId = this.props.match.params.id
        axios.get(`${window.apiHost}/view/${projId}`)
            .then((response) => {
                const projectDetails = response.data[0]
                console.log(projectDetails)
                this.setState({
                    title: projectDetails.name,
                    status: projectDetails.status.statusname,
                    notes: projectDetails.notes,
                    type: projectDetails.type.typename, 
                    dateCreated: projectDetails.createdAt,
                    dateUpdated: projectDetails.updatedAt,
                    color: projectDetails.status.color
                })
            })
            .catch((error => {
                this.setState({
                    error: true
                })
                console.log(error)
            }))
    }

    deleteProject(){
        
    }

    render(){

        const humanizedDateCreated = new Date(this.state.dateCreated).toLocaleDateString();
        const humanizedDateUpdated = new Date(this.state.dateUpdated).toLocaleDateString();
        
        return(
            <div className="DetailCardContainer">
                <DetailCard 
                    title={this.state.title}
                    status={this.state.status}
                    notes={this.state.notes}
                    type={this.state.type}
                    color={this.state.color}
                    dateCreated={humanizedDateCreated}
                    dateUpdated={humanizedDateUpdated}
                    />
                <Link to='/'><Button btnClass='GeneralButton'>Back</Button></Link>
            </div>
        )
    }

}

export default Details;