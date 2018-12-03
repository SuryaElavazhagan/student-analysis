import * as React from 'react';

interface IProps {
    Content?: JSX.Element;
    Filter?: JSX.Element;
    Title: string;
}

export default function Layout({ Content, Filter, Title } : IProps) {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                <h1 className="display-4 text-center">{ Title }</h1>
                {
                    Content
                }
                </div>
            </div>
            <div className="row">
                <div className="col">
                {
                    Filter ? Filter : null
                }
                </div>
            </div>
        </div>
    )
}