import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    let selectColor = {
        backgroundColor: props.value
    }


    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid')
    }

    switch (props.elemType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elemConf}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elemConf}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.elemConf}
                    value={props.value}
                    style={selectColor}
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
            <div className="Label">{props.label}</div>
            {inputElement}
        </div>
    );
};

export default input;