import * as React from "react";

export default function Spinner() {
    return(
        <div className="spinner-border" style={{ width: '6rem', height: '6rem' }} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    )
}