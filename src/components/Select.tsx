import * as React from 'react';

interface ISelectProps {
    title: string;
    options: string[];
    onChange?: (value: string, title: string) => void;
}

export default function Select({ title, options, onChange }: ISelectProps){
    
    function handleChange(){
        const value = (document.getElementById(title)! as HTMLInputElement).value;
        if(onChange){
            onChange(value!, title);
        }
    }

    function optionList(){
        return options.map(option => {
            return(
                <option key={ option } value={ option }>{ option }</option>
            )
        })
    }
    
    return(
        <div className="form-group">
            <div className="row">
                <label className="col-form-label col-sm-3" htmlFor="exampleFormControlSelect1">{ title }</label>
                <div className="col-sm-9">
                    <select className="form-control" id={ title } onChange={ handleChange }>
                    <option>Select any one</option>
                    {
                        optionList()
                    }
                    </select>
                </div>
            </div>
        </div>
    )
}