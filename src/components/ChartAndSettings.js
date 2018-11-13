import  React, { Component } from 'react'
import SemesterAnalysis from './semesterAnalysis'
import GenderClassification from './genderClassification'
import QuotaClassification from './quotaClassification'
import CasteClassification from './casteClassification'
import BoardClassification from './boardClassification'
import SchoolCollegeComparison from './schoolCollegeClassification'
//import BirthdayClassification from './birthdayClassification'
import ArrearReport from './arrearReport'

class ChartAndSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            toRender : {
            'Semester result': <SemesterAnalysis/>,
            'High school vs College': <SchoolCollegeComparison/>,
            'State vs Central': <BoardClassification/>,
            'Male and Female': <GenderClassification/>,
            'Male and Female marks': <div></div>,
            'Govt vs Mgmt': <QuotaClassification/>,
            'Caste info': <CasteClassification/>,
            'HOA and SA': <ArrearReport/>
            }
        }
    }

    render(){
        const { match } = this.props
        let index = match.params.index
        return(
            this.state.toRender[index]
        )
    }
}

export default ChartAndSettings