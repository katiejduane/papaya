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
            {/* <h1 classname="CardTitle">Ideas</h1> */}
            <MiniCard title="Kingfisher" type="Poetry" status="In-Progress"/>
          </div>
        );
    }
}

export default List;