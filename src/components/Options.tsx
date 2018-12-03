import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    options: string[];
    toggleOptions: () => void;
}

export default function Options({ options, toggleOptions }: IProps) {

    const optionsList = options.map(option => {
        return(
            <Link to={`/${option}/`} key={option}>
                <button
                    onClick={toggleOptions} //
                    style={{ cursor: 'pointer' }}
                    type="button"
                    className="list-group-item list-group-item-action text-center list-group-item-secondary">
                    {
                        option
                    }
                </button>
            </Link>
        )
    })
    return(
        <div id="options" className="list-group list-group-flush">
        {
            optionsList
        }
        </div>
    )
}