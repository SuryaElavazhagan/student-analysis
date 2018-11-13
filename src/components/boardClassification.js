import React ,{ Component } from 'react'
import Counter from './counter'
import Table from './table'
import Button from './button'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import { colors } from '../data'
import { getNames, getBoard } from '../api/semester'

class BoardClassification extends Component {

    constructor(props){
        super(props)
        this.state = {
            stateBoardStudents: [],
            cbseStudents: [],
            diplomaStudents: [],
            isDataAvailable: false,
            currentlySelected: '',
            counterColors: [[colors['teal'], colors['light_teal']], [colors['green'], colors['light_green']], [colors['blue'], colors['light_blue']]]
        }

        this.chart = React.createRef()
        this.cleanDataAndDisplay = this.cleanDataAndDisplay.bind(this)
    }

    async cleanDataAndDisplay(){
        const names = await getNames()
        const boardOfEducation = await getBoard()
        
        let stateBoardStudents = [], cbseStudents = [], diplomaStudents = []  

        boardOfEducation.map((board, index) => {
            if(board.toLowerCase().indexOf('state') >= 0){ stateBoardStudents.push(names[index]) }
            if(board.toLowerCase().indexOf('cbse') >= 0){ cbseStudents.push(names[index]) }
            if(board.toLowerCase().indexOf('diploma') >= 0){ diplomaStudents.push(names[index]) }

            return null;
        })

        this.setState({
            stateBoardStudents,
            cbseStudents,
            diplomaStudents,
            isDataAvailable: true
        })
    }

    componentDidMount(){
        this.cleanDataAndDisplay()
    }

    render(){
        const renderSelected = () => {
            const selectedOption = this.state.currentlySelected
            if(selectedOption !== ''){
                const selectedArray = (selectedOption === 'STATE' ? this.state.stateBoardStudents :
                                      (selectedOption === 'CBSE' ? this.state.cbseStudents : this.state.diplomaStudents))
                
                const displayData = {}
                displayData[selectedOption] = selectedArray
                
                return(
                    <div className="tableholder">
                        <center>
                            <h3>Data</h3>
                        </center>
                        <div className="table">
                            <center>
                                <Table title={selectedOption}
                                        displayData={displayData}/>
                                <Button title="File download" icon={FileDownloadIcon}/>
                            </center>
                        </div>
                    </div>
                )
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
                            <Counter count={this.state.stateBoardStudents.length}
                                    title={'STATE'}
                                    countColor={this.state.counterColors[0][0]}
                                    titleColor={this.state.counterColors[0][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'STATE' ? '' : 'STATE' })}/>
                            <Counter count={this.state.cbseStudents.length}
                                    title={'CBSE'}
                                    countColor={this.state.counterColors[1][0]}
                                    titleColor={this.state.counterColors[1][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'CBSE' ? '' : 'CBSE' })}/>
                            <Counter count={this.state.diplomaStudents.length}
                                    title={'DIPLOMA'}
                                    countColor={this.state.counterColors[2][0]}
                                    titleColor={this.state.counterColors[2][1]}
                                    onClick={() => this.setState({ currentlySelected: this.state.currentlySelected === 'DIPLOMA' ? '' : 'DIPLOMA' })}/>
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

export default BoardClassification
