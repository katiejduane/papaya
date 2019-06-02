import React, { Component } from  'react';
import axios from 'axios';

import './List.css';
import MiniCard from '../../../components/Cards/MiniCard/MiniCard';

class List extends Component {
    state = {
        loading: true,
        miniCards: [],
        status: ['Idea', 'Research', 'In-Progress', 'Revision', 'Finished', 'Accepted'],
        types: [],
        error: false
    }

    componentDidMount(){
      axios.get(`${window.apiHost}`)
      .then((response) => {
        console.log(response) 
        this.setState({
          loading: false,
          miniCards: response.data
        })
      })
      .catch((error => {
        this.setState({
          error: true
        })
        console.log(error)
      }));
    }


    render(){

      let miniCardList;
      if(this.state.miniCards.length > 0){
        miniCardList = this.state.miniCards.map((card, i) => {
          return(
            <MiniCard key={i} title={card.name} type={card.type.typename} color={card.status.color} status={card.status.statusname} view={card.id}/>
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