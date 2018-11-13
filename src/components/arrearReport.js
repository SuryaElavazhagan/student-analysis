import React, { Component } from 'react'
import { getNames, getArrearReport } from '../api/semester'
import ToggleButton from './toggle'
import Key from './key'
import Table from './table'
import {generatePieChart} from '../charts/pieChart';
import { colors } from '../data'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import ImageDownloadIcon from '../assets/icons/image_download.svg'
import Button from './button'

class ArrearReport extends Component{

    constructor(props){
        super(props)
        this.state = {
            SA: [],
            HOA: [],
            SAStudents: [],
            HOAStudents: [],
            colors: [colors['lime'], colors['green'], colors['red'], colors['orange'], colors['amber'], colors['blue']],
            categories: ['=0' ,'0 - 5','5 - 10','10 - 15','15 - 20','>=20'],
            isDataAvailable: false,
            currentlyToggled: 'SA',
            showTable: false,
            selectedCategory: -1
        }
        this.chart = React.createRef()
        this.cleanDataAndGenerateChart = this.cleanDataAndGenerateChart.bind(this)
    }

    async cleanDataAndGenerateChart(){
        const names = await getNames()
        const arrears = await getArrearReport()

        let HOA = [0, 0, 0, 0, 0, 0], SA = [0, 0, 0, 0, 0, 0]
        let HOAStudents = [[], [], [], [], [], []], SAStudents = [[], [], [], [], [], []]
        
        arrears.map((arrearReport, index) => {
            if(+arrearReport[0] === 0 || arrearReport[0] === 'NIL' || arrearReport[0] === 'NILL' ||arrearReport[0] === 'N/A') { SAStudents[0].push(names[index]); SA[0]++ }
            if(+arrearReport[0] >=1 && +arrearReport[0] < 5){ SAStudents[1].push(names[index]); SA[1]++}
            if(+arrearReport[0] >=5 && +arrearReport[0] < 10){ SAStudents[2].push(names[index]); SA[2]++}
            if(+arrearReport[0] >=10 && +arrearReport[0] < 15){ SAStudents[3].push(names[index]); SA[3]++}
            if(+arrearReport[0] >=15 && +arrearReport[0] < 20){ SAStudents[4].push(names[index]); SA[4]++}
            if(+arrearReport[0] >=20){ SAStudents[5].push(names[index]); SA[5]++}

            if(+arrearReport[1] === 0 || arrearReport[1] === 'NIL' || arrearReport[1] === 'NILL' || arrearReport[1] === 'N/A') { HOAStudents[0].push(names[index]); HOA[0]++ }
            if(+arrearReport[1] >=1 && +arrearReport[1] < 5){ HOAStudents[1].push(names[index]); HOA[1]++}
            if(+arrearReport[1] >=5 && +arrearReport[1] < 10){ HOAStudents[2].push(names[index]); HOA[2]++}
            if(+arrearReport[1] >=10 && +arrearReport[1] < 15){ HOAStudents[3].push(names[index]); HOA[3]++}
            if(+arrearReport[1] >=15 && +arrearReport[1] < 20){ HOAStudents[4].push(names[index]); HOA[4]++}
            if(+arrearReport[1] >=20){ HOAStudents[5].push(names[index]); HOA[5]++}
            
            return null;
        })

        this.setState({
            SA,
            HOA,
            HOAStudents,
            SAStudents,
            isDataAvailable: true
        })
        
        generatePieChart(this.chart.current, this.state.SA, this.state.colors)
    }

    renderKey(){
        if(this.state.isDataAvailable){
            let keyArray = this.state.currentlyToggled === 'SA' ? this.state.SA : this.state.HOA
            return(
                <Key colors={this.state.colors}
                     data={keyArray}
                     keyData={ this.state.categories }/> 
            )
        }
    }

    componentDidMount(){
        this.cleanDataAndGenerateChart('SA')
    }

    renderTable(){
        if(this.state.showTable){
            let selectedArrayValues = this.state.currentlyToggled === 'SA' ? this.state.SAStudents : this.state.HOAStudents
        
            return(
                <div className="tableholder">
                <center><h3>Data</h3></center>
                <div className="table">
                    <center>
                        <select value={this.state.selectedCategory} 
                            onChange={ (e) => this.setState({ selectedCategory: e.target.value }) }>
                            <option value={-1}>Select a category</option>
                            {
                                this.state.categories.map((data, index) =>(
                                    <option key={index} value={index}>{ data }</option>
                                ))
                            }
                        </select>
                    </center>
                    {
                        (this.state.selectedCategory >= 0) ?  (
                        <center>
                            <Table title={`${this.state.currentlyToggled} || ${this.state.categories[this.state.selectedCategory]}`}
                                displayData={{
                                    'Students': selectedArrayValues[this.state.selectedCategory]
                                }}/>
                        </center>) : null
                    }
                    <center>
                    {
                        (this.state.selectedCategory >= 0) ? <Button title="File download" icon={FileDownloadIcon}/> : null
                    }
                    </center>
                    </div>
                </div>
            )
        }
    }

    render(){
        const toggle = (isToggled) => {
            let selected = isToggled ? 'HOA' : 'SA'
            this.setState({
                currentlyToggled: selected
            })
            
            if(this.chart.current.getElementsByTagName('svg').length > 0)
                this.chart.current.removeChild(this.chart.current.getElementsByTagName('svg')[0])

            if(selected === 'HOA'){
                generatePieChart(this.chart.current, this.state.HOA, this.state.colors)
            }else{
                generatePieChart(this.chart.current, this.state.SA, this.state.colors)
            }
        }
        return(
            <div className="wrapper">
                <div className="display">
                    <center>
                        <h3>Arrear Report</h3>
                        <ToggleButton options={['Standing Arrear Report', 'History of Arrear Report']} onChange={(isToggled) => toggle(isToggled)}/>
                    </center>
                    <div className="charts">
                        <div className="chart" ref={this.chart} onClick={() => this.setState({ showTable: !this.state.showTable }) }/>
                        { this.renderKey() }
                    </div>
                    <center>
                        {
                            (this.state.isDataAvailable) ? <Button title="Chart Download" icon={ImageDownloadIcon}/> : null
                        }
                    </center>
                </div>
                {
                    this.renderTable()
                }
            </div>
        )
    }
}

export default ArrearReport