import * as React from 'react';

interface IProps {
    Content?: JSX.Element;
    Filter?: JSX.Element;
    Title: string;
}

export default function Layout({ Content, Filter, Title } : IProps) {
    return(
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col align-self-center">
                <h1 className="display-4 text-center">{ Title }</h1>
                {
                    Content
                }
                </div>
            </div>
            <hr className="my-4"/>
            <div className="row">
                <div className="col">
                <h1 className="display-4 text-center">Filters</h1>
                {
                    Filter ? Filter : null
                }
                </div>
            </div>
        </div>
    )
}