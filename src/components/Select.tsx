import * as React from 'react';

/**
 * Select component
 * 
 * Usage:
 *      <Select title={'Title for the select'}
 *              options={Array of select options}
 *              onChange={changeHandler} 
 *              value={currentValue}/>
 * 
 * onChange handler will be passed with the value selected and the title
 * of the select box.
 */

interface ISelectProps {
    title: string;
    options: string[];
    value: string;
    onChange?: (value: string, title: string) => void;
}

export default function Select({ title, options, value, onChange }: ISelectProps){
    
    function handleChange(){
        const changedValue = (document.getElementById(title)! as HTMLInputElement).value;
        if(onChange){
            onChange(changedValue!, title);
        }
    }

    function optionList(){
        return options.map(option => {
            return(
                <option key={ option } value={ option }>{ option }</option>
            );
        });
    }
    
    return(
        <div className="form-group" role="select-box">
            <div className="row">
                <label className="col-form-label col-sm-3" htmlFor="exampleFormControlSelect1">{ title }</label>
                <div className="col-sm-9">
                    <select className="form-control" id={ title }
                        onChange={ handleChange }
                        value={value}>
                    <option value={title.toLowerCase() === 'semester' ? 0 : ""}>Select any one</option>
                    {
                        optionList()
                    }
                    </select>
                </div>
            </div>
        </div>
    )
}