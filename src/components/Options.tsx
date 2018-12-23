import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * This shows up on clicking the hamburger menu
 */

 interface IProps {
    options: string[];
    toggleOptions: () => void;
    show: boolean;
}

export default function Options({ options, toggleOptions, show }: IProps) {

    const optionsList = options.map(option => {
        return(
            <Link to={`/${option}/`} key={option}>
                <button
                    onClick={ toggleOptions }
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

    const classes = show ? 'list-group list-group-flush collapse show' :
                'list-group list-group-flush collapse';

    return(
        <div id="options" className={ classes }>
        {
            optionsList
        }
        </div>
    )
}