import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid')
    }

    switch (props.elemType) {
        case ('input'):
            inputClasses.push('input-reg')
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConf}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputClasses.push('input-textarea')
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elemConf}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputClasses.push('input-select')
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elemConf}
                    // i might have the handle the options differently here! they will come in from DB
                    // and adjust their own piece of state in the NewProject.js file, rather than be 
                    // hard coded in the conf... i hope it is possible!? 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elemConf.options.map(option => (
                        <option key={option.value} value={option.value}
                            onChange={props.changed}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                value={props.value} />;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;