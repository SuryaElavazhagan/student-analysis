import * as React from 'react';

interface IRadioProp {
    title: string;
    options: string[];
    onChange?: (value: string, title: string) => void;
}

export default function RadioGroup({ title, options, onChange }: IRadioProp) {
    
    function handleChange(){
        const value = (document.querySelector(`input[name="${ title }"]:checked`)! as HTMLInputElement).value;
        if(onChange){
            onChange(value!, title);
        }
    }

    function buttonList(){
        return options.map(option => {
            return(
                <div key={option} className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name={ title }
                    id={ option } value={ option } onChange={ handleChange }/>
                    <label className="form-check-label" htmlFor={ option }>
                        { option }
                    </label>
                </div>
            )
        })
    }
    return(
        <fieldset className="form-group">
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