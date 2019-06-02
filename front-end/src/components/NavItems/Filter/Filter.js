import React from 'react';
import { Link } from 'react-router-dom';

import './Filter.css';
import Button from '../../UI/Button/Button';
import { prependOnceListener } from 'cluster';

const filter = (props) => (
    <form onSubmit={props.filterBy} className='filterForm'>
        
    </form>
)