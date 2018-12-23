import * as React from 'react';

/**
 * RadioGroup component
 * 
 * Usage: 
 *  <RadioGroup title={'RadioGroup title'} 
 *              options={Array of options need to be shown}
 *              onChange={changeHandler}
 *              value={currentValue} />
 * 
 * onChange handler will be passed with the value and the title of the radiogroup.
 */

 interface IRadioProp {
    title: string;
    options: string[];
    value: string;
    onChange?: (value: string, title: string) => void;
}

export default function RadioGroup({ title, options, value, onChange }: IRadioProp) {
    
    function handleChange(){
        const changedValue = (document.querySelector(`input[name="${ title }"]:checked`)! as HTMLInputElement).value;
        if(onChange){
            onChange(changedValue!, title);
        }
    }

    function buttonList(){
        return options.map(option => {
            return(
                <div key={option} className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={ title }
                    id={ option } value={ option }
                    onChange={ handleChange } checked={value === option}/>
                    <label className="form-check-label" htmlFor={ option }>
                        { option }
                    </label>
                </div>
            )
        })
    }
    return(
        <fieldset className="form-group" role="radio-group">
            <div className="row">
                <legend className="col-form-label col-sm-3">{ title }</legend>
                <div className="col-sm-9">
                {
                    buttonList()
                }
                </div>
            </div>
        </fieldset>
    )
}