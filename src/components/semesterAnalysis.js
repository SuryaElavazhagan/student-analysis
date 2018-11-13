import React, {
    Component
} from 'react'
import {
    getStudentResults,
    getNames
} from '../api/semester'
import {
    generateBarChart
} from '../charts/barChart'
import Key from './key'
import Table from './table'
import FileDownloadIcon from '../assets/icons/file_download.svg'
import ImageDownloadIcon from '../assets/icons/image_download.svg'
import Button from './button'

class SemesterAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5'],
            categorizedData: [],
            currentlySelectedSemesterStudents: [],
            currentlySelectedSemesterCounts: [],
            names: [],
            colors: ['#3f51b5', '#2196f3', '#f44336', '#ffc107', '#ff9800', '#4caf50', '#004d40'],
            categories: ['5 to 6', '6 to 6.5', '6.5 to 7', '7 to 7.5', '7.5 to 8', '8 to 8.5', '8.5 to 9'],
            coordinates: ['Categories', 'No. of Students'],
            isDataAvailable: false,
            showTable: false,
            selectedCategory: -1,
            selectedSemester: -1
        }
        this.chart = React.createRef()
        this.cleanDataAndGenerateChart = this.cleanDataAndGenerateChart.bind(this)
        this.renderKey = this.renderKey.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderTable = this.renderTable.bind(this)
    }

    async cleanDataAndGenerateChart() {
        let results = await getStudentResults()
        let names = await getNames()
        let categorizedData = [
            [],
            [],
            [],
            [],
            []
        ]

        results.map(studentResult => {
            studentResult.map((stud, index) => {
                categorizedData[index].push(stud)
                return null
            })
            return null
        })

        this.setState({
            categorizedData,
            names,
            isDataAvailable: true
        })
    }

    componentDidMount() {
        this.cleanDataAndGenerateChart()
    }

    renderKey() {
        if (this.state.isDataAvailable && this.state.selectedSemester >= 0) {
            return ( <
                Key colors = {
                    this.state.colors
                }
                data = {
                    this.state.currentlySelectedSemesterCounts
                }
                keyData = {
                    this.state.categories
                }
                />
            )
        }
    }

    handleChange(e) {
        let selectedSemester = e.target.value
        if (selectedSemester >= 0) {
            let results = this.state.categorizedData[selectedSemester]
            let currentlySelectedSemesterStudents = [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
            let currentlySelectedSemesterCounts = [0, 0, 0, 0, 0, 0, 0]
            let names = this.state.names

            for (let i = 0; i < results.length; i++) {
                if (results[i] !== 'N/A') {
                    if (results[i] >= 5 && results[i] < 6) {
                        currentlySelectedSemesterStudents[0].push(names[i]);
                        currentlySelectedSemesterCounts[0]++
                    }
                    if (results[i] >= 6 && results[i] < 6.5) {
                        currentlySelectedSemesterStudents[1].push(names[i]);
                        currentlySelectedSemesterCounts[1]++
                    }
                    if (results[i] >= 6.5 && results[i] < 7) {
                        currentlySelectedSemesterStudents[2].push(names[i]);
                        currentlySelectedSemesterCounts[2]++
                    }
                    if (results[i] >= 7 && results[i] < 7.5) {
                        currentlySelectedSemesterStudents[3].push(names[i]);
                        currentlySelectedSemesterCounts[3]++
                    }
                    if (results[i] >= 7.5 && results[i] < 8) {
                        currentlySelectedSemesterStudents[4].push(names[i]);
                        currentlySelectedSemesterCounts[4]++
                    }
                    if (results[i] >= 8 && results[i] < 8.5) {
                        currentlySelectedSemesterStudents[5].push(names[i]);
                        currentlySelectedSemesterCounts[5]++
                    }
                    if (results[i] >= 8.5 && results[i] < 9) {
                        currentlySelectedSemesterStudents[6].push(names[i]);
                        currentlySelectedSemesterCounts[6]++
                    }
                }
            }

            this.setState({
                selectedSemester,
                currentlySelectedSemesterStudents,
                currentlySelectedSemesterCounts
            })

            if (this.chart.current.getElementsByTagName('svg').length > 0) {
                this.chart.current.removeChild(this.chart.current.getElementsByTagName('svg')[0])
            }

            generateBarChart(this.chart.current,
                currentlySelectedSemesterCounts,
                this.state.colors,
                this.state.coordinates,
                this.state.categories)
        }
    }

    renderTable() {
        if (this.state.isDataAvailable && this.state.showTable) {
            let options = ['5 - 6', '6 - 6.5', '6.5 - 7', '7 - 7.5', '7.5 - 8', '8 - 8.5', '8.5 - 9']
            return ( <
                    div className = "tableholder" >
                    <
                    center > < h3 > Data < /h3></center >
                    <
                    div className = "table" >
                    <
                    center >
                    <
                    select value = {
                        this.state.selectedCategory
                    }
                    onInput = {
                        (e) => this.setState({
                            selectedCategory: e.target.value
                        })
                    } >
                    <
                    option value = {-1
                    } > Select a semester < /option> {
                    options.map((data, index) => ( <
                        option key = {
                            index
                        }
                        value = {
                            index
                        } > {
                            data
                        } < /option>
                    ))
                } <
                /select> < /
                center > {
                    (this.state.selectedCategory !== '' && this.state.selectedCategory >= 0) ? ( <
                        center >
                        <
                        Table title = "Semester Comparison"
                        displayData = {
                            {
                                'Students': this.state.currentlySelectedSemesterStudents[this.state.selectedCategory]
                            }
                        }
                        /> < /
                        center > ) : null
                } <
                center > {
                    (this.state.selectedCategory !== '' && this.state.selectedCategory >= 0) ? < Button title = "File download"
                    icon = {
                        FileDownloadIcon
                    }
                    /> : null
                } <
                /center> < /
                div > <
                /div>
        )
    }
}
render() {
        return ( <
                div className = "wrapper" >
                <
                div className = "display" >
                <
                center >
                <
                h3 > Semester Analysis < /h3> <
                select value = {
                    this.state.selectedSemester
                }
                onChange = {
                    this.handleChange
                } >
                <
                option value = {-1
                } > {
                    'Select any semester'
                } < /option> {
                this.state.options.map((option, index) =>
                    <
                    option key = {
                        index
                    }
                    value = {
                        index
                    } > {
                        option
                    } < /option>    
                )
            } <
            /select> < /
            center >

            <
            div className = "charts" >
            <
            div className = "chart"
        ref = {
            this.chart
        }
        onClick = {
            () => this.setState({
                showTable: !this.state.showTable
            })
        }
        /> {
        this.renderKey()
    } <
    /div> <
center > {
        (this.state.isDataAvailable && this.state.selectedSemester >= 0) ? < Button title = "Chart Download"
        icon = {
            ImageDownloadIcon
        }
        /> : null
    } <
    /center> < /
    div > {
        this.renderTable()
    } <
    /div>
)
}
}

export default SemesterAnalysis