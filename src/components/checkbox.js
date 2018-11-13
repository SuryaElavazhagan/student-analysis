import React , {Component} from 'react'
import '../style/checkbox.css'

class CheckBox extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        this.setState({
            checked: !this.state.checked
        })

        this.props.onClick(this.state.checked)
    }

    render(){
        return(
            <div className="checkbox">
                <input id="labelValue" className="checkbox-option" type={'checkbox'} onClick={(e) => this.handleClick(e)}/>
            </div>
        )
    }
}

export default CheckBox