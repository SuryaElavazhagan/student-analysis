import React, { Component } from 'react'
import Button from './button'
import Table from './table'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import ImageDownloadIcon from '../assets/icons/image_download.svg'
import { colors } from '../data'
import { getNames, getHSCMarks, getSSLCMarks, getStudentResults } from '../api/semester'
import generateLineChart from '../charts/lineChart';

class SchoolCollegeComparison extends Component {

    constructor(props){
        super(props)

        this.state = {
            names : [],
            HSC: [],
            SSLC: [],
            semester: [],
            categorizedData: [],
            lineColor: colors['blue_grey'],
            pointsColor: [colors['green'], colors['red'], colors['orange'], colors['purple'], colors['lime'], colors['amber'], colors['teal']],
            isDataAvailable: false,
            showTable: false,
            selectedIndex: -1
        }

        this.chart = React.createRef()
        this.cleanDataAndGenerateChart = this.cleanDataAndGenerateChart.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.cleanDataAndGenerateChart()
    }

    async cleanDataAndGenerateChart(){
        if(this.state.names.length <= 0){
            const names = await getNames()
            const HSC = await getHSCMarks()
            const SSLC = await getSSLCMarks()
            const semester = await getStudentResults()
    
            let categorizedData = []
    
            for(let i = 0; i < semester.length; i++){
                categorizedData.push([HSC[i] > 10 ? HSC[i]/10 : HSC[i], SSLC[i] > 10 ? SSLC[i]/10 : SSLC[i], ...semester[i].map((sem, i) => i=== 0 ? +sem.split('-')[0] : +sem)])
            }
    
            this.setState({
                names,
                HSC,
                SSLC,
                semester,
                categorizedData,
                isDataAvailable: true
            })
        }
    }

    renderTable(){
        if(this.state.isDataAvailable && this.state.showTable && this.state.selectedIndex >= 0){
            let list = ['HSC', 'SSLC']
            
            for(let i = 2; i < this.state.categorizedData[this.state.selectedIndex].length; i++){
                list.push(`Sem - ${i - 1}`)
            }

            return(
                <div className="tableholder">
                    <center><h3>Data</h3></center>
                    <div className="table">
                        <center>
                            <Table title="Semester Comparison"
                                displayData={{
                                    'Exams': list,
                                    'Marks': this.state.categorizedData[this.state.selectedIndex]
                                }}/>
                            <Button title="File download" icon={FileDownloadIcon}/>
                        </center>
                    </div>
                </div>
            )
        }
    }

    handleChange(e){
        
        let selectedIndex = e.target.value
        
        this.setState({ 
            selectedIndex
        })
        
        if((selectedIndex <= this.state.semester.length) && (selectedIndex >= 0))
        {
            const svg = this.chart.current.getElementsByTagName('svg')[0]
            if(svg){
                this.chart.current.removeChild(svg)
            }
            generateLineChart(this.chart.current , this.state.categorizedData[selectedIndex], this.state.lineColor, this.state.pointsColor)
        }
    }

    renderOptions(){
        if(this.state.isDataAvailable){
            return(
                <select
                    value={ this.state.selectedIndex }
                    onChange={ (e) => this.handleChange(e) }
                >
                <option value={-1}>Select a student</option>
                {
                    this.state.names.map((name, index) => 
                        index < this.state.semester.length ? <option key={index} value={index}>{ name }</option> : null
                    )
                }
                </select>
            )
        }
    }

    render(){
        return(
            <div className="wrapper">
                <div className="display">
                    <center>
                        <h3>School vs College</h3>
                        {
                            this.renderOptions()
                        }
                    </center>
                    <div className="charts">
                        <div className="chart" ref={this.chart} onClick={() => this.setState({ showTable: !this.state.showTable }) }/>
                    </div>
                    <center>
                        {
                            this.state.selectedIndex >= 0 ? <Button title="Chart Download" icon={ImageDownloadIcon}/> : null
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

export default SchoolCollegeComparison