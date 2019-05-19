import React, { Component } from 'react';
import axios from 'axios';

import './Details.css';
import DetailCard from '../../../components/Cards/DetailCard/DetailCard';

class Details extends Component {
    state = {
        title: '',
        status: '',
        notes: '',
        type: '',
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
                    status: projectDetails.status,
                    notes: projectDetails.notes,
                    type: projectDetails.type.typename, // how to handle this separate request to another table!?
                    color: projectDetails.type.color, // this is also from 'types'
                })
            })
            .catch((error => {
                this.setState({
                    error: true
                })
                console.log(error)
            }))
    }

    render(){
        return(
            <div className="DetailCardContainer">
                <DetailCard 
                    title={this.state.title}
                    status={this.state.status}
                    notes={this.state.notes}
                    type={this.state.type}
                    color={this.state.color}
                    />
            </div>
        )
    }

}

export default Details;