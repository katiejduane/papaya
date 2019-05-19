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
                const projectDetails = response.data
                console.log(response)
                this.setState({
                    title: projectDetails.name,
                    status: projectDetails.status,
                    notes: projectDetails.notes
                    // type: response.data.name, // how to handle this separate request to another table!?
                    // color: response.data.color, // this is also from 'types'
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
                    notes={this.state.notes}/>
            </div>
        )
    }

}

export default Details;