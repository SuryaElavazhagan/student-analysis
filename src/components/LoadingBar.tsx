import * as React from "react";

export default function LoadingBar() {
    return(
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-currentstate="loading"
            style={{ width: '100%' }}/>
        </div>
    )
}