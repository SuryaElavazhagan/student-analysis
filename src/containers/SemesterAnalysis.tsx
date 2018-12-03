import * as React from 'react';
import { connect } from 'react-redux';
import { renderBarChart } from 'src/charts/barChart';
import Filters from 'src/components/Filters';
import { IFilter, IStoreState } from 'src/store/types';
import { apiCall } from "../api/sheets";
import Layout from '../components/Layout';
import Chart from './Chart';

interface ISemesterAnalysisProps {
    semesterFilter: IFilter;
}

function SemesterAnalysis({ semesterFilter }: ISemesterAnalysisProps) {
    
    async function fetchSemesterMarks() {
        const ALL_SEMESTER_RANGE = 'CSE!S2:W110';
        const results: number[][] = await apiCall(ALL_SEMESTER_RANGE);
        const semesterOne = results.map(d => d[0]);
        const categorizedData: number[][] = [[], [], [], [], [], [], []];

        for (let i = 0; i < semesterOne.length; i++) {
            if (semesterOne[i] >= 5 && semesterOne[i] < 6) {
                categorizedData[0].push(i);
            }
            if (semesterOne[i] >= 6 && semesterOne[i] < 6.5) {
                categorizedData[1].push(i);
            }
            if (semesterOne[i] >= 6.5 && semesterOne[i] < 7) {
                categorizedData[2].push(i);
            }
            if (semesterOne[i] >= 7 && semesterOne[i] < 7.5) {
                categorizedData[3].push(i);
            }
            if (semesterOne[i] >= 7.5 && semesterOne[i] < 8) {
                categorizedData[4].push(i);
            }
            if (semesterOne[i] >= 8 && semesterOne[i] < 8.5) {
                categorizedData[5].push(i);
            }
            if (semesterOne[i] >= 8.5 && semesterOne[i] < 9) {
                categorizedData[6].push(i);
            }
        }

        renderBarChart(categorizedData.map(d => d.length), 'chart');
    }

    return(
        <Layout
        Title='Semester Analysis'
        Content={
            <Chart chartLogic={fetchSemesterMarks} />
        }
        Filter={
            <Filters filterKey={0} filters={['Board', 'Gender', 'Caste', 'Semester', 'SSLC Filter', 'HSC Filter']}/>
        }/>
    )
}

const mapStateToProps = (state: IStoreState) => ({
    semesterFilter: state.filters[0]
})

export default connect(mapStateToProps, null)(SemesterAnalysis);