import React, { Component } from 'react'

class Counter extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
        this.beginCounter = this.beginCounter.bind(this)
    }

    shouldComponentUpdate(nextProps, _){
        return nextProps.count !== this.state.count
    }

    beginCounter(){
        let finalValue = this.props.count

        let interval = setInterval(() => {
                            if(this.state.count === finalValue){
                                clearInterval(interval)
                            }else{
                                this.setState({ count: this.state.count + 1 })
                            }
                        }, 50)

    }

    render(){
        this.beginCounter()
        return(
            <div onClick={() => this.props.onClick()} style={{ display: 'inline-block', margin: '5px', cursor: 'pointer'}}>
                <p style={{ padding: '0', margin: '0',font: 'bold 100px sans-serif', color: this.props.countColor }}>{this.state.count}</p>
                <p style={{ padding: '0', margin: '0',font: 'bold 20px sans-serif', color: this.props.titleColor }}>{this.props.title}</p>
            </div>
        )
    }
}

export default Counter