import React, { Component } from 'react';
import '../style/toggle.css'

class ToggleButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            currentState: false,
            selectedStyle: { fontWeight: 'bold' }
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        const currentState = !this.state.currentState

        this.setState({
            currentState
        })
    
        this.props.onChange(currentState)
    }

    render(){
        return(
            <div className="toggle" onClick={this.handleClick}>
                <div className="option"  style={!this.state.currentState ? this.state.selectedStyle : null}>{this.props.options[0]}</div>
                <svg style={{width : 60, height : 30, display: 'inline', margin: '0px 5px'}}>
                    <g>
                        <rect x={"0"} y={"0"} width={"60"} height={"30"} rx={"15"} ry={"15"} fill={'#FFFFFF'}/>
                        <circle cx={this.state.currentState ? 45 : 15} cy={"15"} r={"14"} fill={"#90a4ae"}/>
                    </g>
                </svg>
                <div className="option" style={this.state.currentState ? this.state.selectedStyle : null}>{this.props.options[1]}</div>
            </div>
        )
    }
}

export default ToggleButton