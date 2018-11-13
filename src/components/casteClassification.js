import React, { Component } from 'react'
import Key from './key'
import Table from './table'
import Button from './button'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import ImageDownloadIcon from '../assets/icons/image_download.svg'
import { colors } from '../data'
import { generateBarChart } from '../charts/barChart'
import { getCaste, getNames } from '../api/semester'

class CasteClassification extends Component{

    constructor(props){
        super(props)
        this.state = {
            categorizedCaste: [],
            casteCount: [],
            colors: [colors['lime'], colors['green'], colors['red'], colors['orange'], colors['amber'], colors['blue'], colors['purple'], colors['teal']],
            categories: ['BC', 'BCM', 'MBC', 'SC', 'ST', 'FC', 'OC', 'Others'],
            coordinates: ['Caste', 'No. of Students'],
            selectedCategory: -1,
            isDataAvailable: false,
            showTable: false
        }

        this.chart = React.createRef()
        this.cleanDataAndGenerateChart = this.cleanDataAndGenerateChart.bind(this)
        this.renderTable = this.renderTable.bind(this)
    }

    async cleanDataAndGenerateChart(){
        let caste = await getCaste()
        let names = await getNames()

        let categorizedCaste = [[],[],[],[],[],[],[], []], casteCount = [0,0,0,0,0,0,0,0]
        caste.map((caste, index) => {
            switch(caste.toUpperCase()){
                case this.state.categories[0]: categorizedCaste[0].push(names[index])
                                               casteCount[0]++
                                               break;
                case this.state.categories[1]: categorizedCaste[1].push(names[index])
                                               casteCount[1]++                
                                               break;
                case this.state.categories[2]: categorizedCaste[2].push(names[index])
                                               casteCount[2]++
                                               break;
                case this.state.categories[3]: categorizedCaste[3].push(names[index])
                                               casteCount[3]++                
                                               break;
                case this.state.categories[4]: categorizedCaste[4].push(names[index])
                                               casteCount[4]++
                                               break;
                case this.state.categories[5]: categorizedCaste[5].push(names[index])
                                               casteCount[5]++
                                               break;
                case this.state.categories[6]: categorizedCaste[6].push(names[index])
                                               casteCount[6]++
                                               break;
                default: categorizedCaste[7].push(names[index])
                         casteCount[7]++
            }
            return null
        })

        this.setState({
            categorizedCaste,
            casteCount,
            isDataAvailable: true
        })

        generateBarChart(this.chart.current,
                        casteCount,
                        this.state.colors,
                        this.state.coordinates,
                        this.state.categories,
                        [],
                        5)
    }

    renderKey(){
        if(this.state.isDataAvailable){
            return(
                <Key colors={ this.state.colors }
                data={ this.state.casteCount }
                keyData={ this.state.categories }/>
            )
        }
    }

    componentDidMount(){
        this.cleanDataAndGenerateChart()
    }

    renderTable(){
        if(this.state.showTable){
            return(
                <div className="tableholder">
                <center><h3>Data</h3></center>
                <div className="table">
                    <center>
                        <select value={this.state.selectedCategory} 
                            onChange={ (e) => this.setState({ selectedCategory: e.target.value }) }>
                            <option value={-1}>Select a caste</option>
                            {
                                this.state.categories.map((data, index) =>(
                                    <option key={index} value={index}>{ data }</option>
                                ))
                            }
                        </select>
                    </center>
                    {
                        ( this.state.selectedCategory >= 0) ?  (
                        <center>
                            <Table title={this.state.categories[this.state.selectedCategory]}
                                    displayData={{
                                        'Students': this.state.categorizedCaste[this.state.selectedCategory]
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
        return(
            <div className="wrapper">
                <div className="display">
                    <center>
                        <h3>Caste Info</h3>
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

export default CasteClassification