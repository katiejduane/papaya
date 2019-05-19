import React, { Component } from  'react';
import axios from 'axios';

import './List.css';
import MiniCard from '../../../components/Cards/MiniCard/MiniCard';

class List extends Component {
    state = {
        miniCards: [],
        status: ['Idea', 'In-Progress', 'Revision', 'Finished', 'Accepted'],
        types: [],
        colors: [],
        error: false
    }

    componentDidMount(){
      axios.get(`${window.apiHost}`)
      .then((response) => {
        console.log(response) 
        this.setState({
          miniCards: response.data
          // types: response.data.type.type
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
            <MiniCard key={i} title={card.name} type={card.type.typename} color={card.type.color} status={card.status} view={card.id}/>
          );
        });
      } else {
        return(
          <h2>You don't have any projects yet!</h2>
        )
      }

        return (
          <div className="MiniCardContainer">
            {miniCardList}
          </div>
        );
    }
}

export default List;