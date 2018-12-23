import * as React from "react";

/**
 * Usual welcome message component
 */

export default function Welcome(){
    return(
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-4">Welcome!</h1>
                <p className="lead">
                    This is my assignment to Data Analytics class. This project helps to visualize student progress in examination,
                    and filter them based on their Gender, High School Marks, SSLC Marks, Caste, History of Arrears, Standing arrears,
                    Board of Education, Quota.
                </p>
                <hr className="my-4"/>
                <p>
                    You can also view non-academic data like Birthday Twins, Students with same school background.
                    I have attached the link to the spreadsheet from which all the Information are fetched here!
                </p>
                <a role="button"
                href="https://docs.google.com/spreadsheets/d/1gBVGfqmFVOQ2tLj09HEEL854yF3PfvhA4kpGHNgTp5M/edit#gid=2035923119"
                className="btn btn-primary btn-lg btn-block">Sheet</a>
            </div>
        </div>
    )
}