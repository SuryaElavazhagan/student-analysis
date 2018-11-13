import React, { Component } from 'react'
import { getGender, getNames } from '../api/semester'
import { colors } from '../data'
import Button from './button'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import Counter from './counter'
import Table from './table'

class GenderClassification extends Component{

    constructor(props){
        super(props)
        this.state = {
            currentlySelected: '',
            maleStudents: [],
            femaleStudents: [],
            counterColors: [[colors['purple'], colors['light_purple']], [colors['orange'], colors['light_orange']]]
        }

        this.cleanDataAndDisplay = this.cleanDataAndDisplay.bind(this)
    }

    async cleanDataAndDisplay(){
        let result = await getGender()
        let names = await getNames()
        let maleStudents = [], femaleStudents = []

        result.map((gender, index) => {
            if(gender.toLowerCase() === "female"){
                femaleStudents.push(names[index])
            }
            else{
                maleStudents.push(names[index])
            }
            return null;
        })

        this.setState({
            maleStudents,
            femaleStudents
        })
    }

    componentDidMount(){
        this.cleanDataAndDisplay()
    }

    render(){
        const renderSelected = () => {
            if(this.state.currentlySelected !== ''){
                let selectedArray = this.state.currentlySelected === 'MALE' ? this.state.maleStudents : this.state.femaleStudents
            
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
                                <Button title="File download" icon={FileDownloadIcon}/>
                            </center>
                        </div>
                    </div>
                )
            }else{
                return null
            }
        }
        return(
            <div className="wrapper">
                <div className="display">
                    <center>
                        <h3>Gender Classification</h3>
                    </center>
                    <div className="charts">
                        <div className="counter">
                            <Counter count={this.state.maleStudents.length}
                                    title={'MALE'}
                                    countColor={this.state.counterColors[0][0]}
                                    titleColor={this.state.counterColors[0][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'MALE' ? '' : 'MALE' })}/>
                            <Counter count={this.state.femaleStudents.length}
                                    title={'FEMALE'}
                                    countColor={this.state.counterColors[1][0]}
                                    titleColor={this.state.counterColors[1][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'FEMALE' ? '' : 'FEMALE' })}/>
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

export default GenderClassification