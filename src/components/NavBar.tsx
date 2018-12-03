import * as React from 'react';
import { Link } from "react-router-dom";
import Options from './Options';

interface IState {
    showOptions: boolean;
}

interface IProps {
    navHeaderName: string;
    options: string[];
};

export default class NavBar extends React.Component<IProps, IState> {

    public state : IState = {
        showOptions: false
    }

    public handleToggle = () => {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    public hideToggle = () => {
        this.setState({
            showOptions: false
        })
    }

    public render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark" >
                    <Link to="/" className="navbar-brand" onClick={ this.hideToggle }>
                        { this.props.navHeaderName }
                    </Link>
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={ this.handleToggle }>
                        <span className="navbar-toggler-icon"/>
                    </button>
                </nav>
                {
                    this.state.showOptions ? (
                        <Options
                            options={ this.props.options }
                            toggleOptions={ this.handleToggle }
                            />
                    ): null
                }
            </div>
        )
    }
}