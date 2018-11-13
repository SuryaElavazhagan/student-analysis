import React, { Component } from 'react'
import { getQuota, getNames } from '../api/semester'
import { colors } from '../data'
import Counter from './counter'
import Table from './table'

class QuotaClassification extends Component{

    constructor(props){
        super(props)
        this.state = {
            govtCount: 0,
            mgmtCount: 0,
            mgmtStudents: [],
            govtStudents: [],
            counterColors: [[colors['blue'], colors['light_blue']], [colors['green'], colors['light_green']]],
            currentlySelected: ''
        }
        this.cleanDataAndDisplay = this.cleanDataAndDisplay.bind(this)
    }

    async cleanDataAndDisplay(){
        let result = await getQuota()
        let names = await getNames()

        
        let govtCount = 0, mgmtCount = 0, mgmtStudents = [], govtStudents = [] 

        result.map((quota, index) => {
            if(quota === "MQ"){
                mgmtCount++
                mgmtStudents.push(names[index])
            }
            else{
                govtCount++
                govtStudents.push(names[index])
            }
            return null;
        })

        this.setState({
            govtCount,
            mgmtCount,
            govtStudents,
            mgmtStudents
        })
    }

    componentDidMount(){
        this.cleanDataAndDisplay()
    }

    render(){
        const renderSelected = () => {
            if(this.state.currentlySelected !== ''){
                let selectedArray = this.state.currentlySelected === 'GOVT' ? this.state.govtStudents : this.state.mgmtStudents
            
                let displayData = {
                    'Names' : selectedArray
                }
                return(
                    <div className="tableholder">
                        <center>
                            <h3>Data</h3>
                        </center>
                        <div className="table">
                            <center>
                                <Table title={this.state.currentlySelected}
                                displayData={displayData}/>
                            </center>
                        </div>
                    </div>
                )
            }else
                return null
        }
        return(
            <div className="wrapper">
                <div className="display">
                    <center>
                        <h3>Semester Analysis</h3>
                    </center>
                    <div className="charts">
                        <div className="counter">
                            <Counter count={this.state.govtCount}
                                    title={'GOVT.'}
                                    countColor={this.state.counterColors[0][0]}
                                    titleColor={this.state.counterColors[0][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'GOVT' ? '' : 'GOVT' })}/>
                            <Counter count={this.state.mgmtCount}
                                    title={'MGMT.'}
                                    countColor={this.state.counterColors[1][0]}
                                    titleColor={this.state.counterColors[1][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'MGMT' ? '' : 'MGMT' })}/>
                        </div>
                    </div>
                    {
                            renderSelected()
                    }
                </div>
            </div>
        )
    }

}

export default QuotaClassification