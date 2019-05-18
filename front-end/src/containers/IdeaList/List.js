import React, { Component } from  'react';
import axios from 'axios';

import './List.css';
import MiniCard from '../../components/Cards/MiniCard/MiniCard';

class List extends Component {
    state = {
        miniCards: [],
        status: ['Idea', 'In-Progress', 'Revision', 'Finished', 'Accepted'],
        error: false
    }

    componentDidMount(){
      axios.get(`${window.apiHost}`)
      .then((response) => {
        console.log(response)
        this.setState({
          miniCards: response.data
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

      let miniCardList;
      if(this.state.miniCards.length > 0){
        miniCardList = this.state.miniCards.map((card, i) => {
          return(
            <MiniCard key={i} title={card.name} type={card.type} status={card.status} />
          );
        });
      } 

        return (
          <div className="CardContainer">
            {miniCardList}
          </div>
        );
    }
}

export default List;