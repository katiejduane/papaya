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
        axios.get(`${window.apiHost}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    title: response.data.name,
                    status: response.data.status,
                    notes: response.data.notes
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
            <h1>working on it</h1>
        )
    }

}

export default Details;