import React, { Component } from  'react';

import './List.css';
import MiniCard from '../../components/Cards/MiniCard/MiniCard';

class List extends Component {
    state = {
        miniCards: []
    }

    render(){
        return (
          <div className="CardContainer">
            <MiniCard title="Kingfisher" type="Poetry" status="In-Progress"/>
          </div>
        );
    }
}

export default List;