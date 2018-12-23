import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { renderBarChart } from 'src/charts/barChart';
import Filters from 'src/components/Filters';
import { IFilter, IStoreState } from 'src/store/types';
import api from "../api/APICalls";
import Layout from '../components/Layout';
import { setCachedArray, setDataLoaded } from '../store/actions/filterActions';
import Chart from './Chart';

interface ISemesterAnalysisProps {
    semesterFilter: IFilter;
    setCategorizedData: (data: number[][]) => void;
}

function SemesterAnalysis({ semesterFilter, setCategorizedData }: ISemesterAnalysisProps) {
    
    async function fetchSemesterMarks() {
        if(!semesterFilter.isLoaded) {
            const currentSemester = await api.fetchMarks('semester', semesterFilter.semester - 1);
            
            const categorizedData: number[][] = [[], [], [], [], [], [], []];
    
            for (let i = 0; i < currentSemester.length; i++) {
                if (currentSemester[i] >= 5 && currentSemester[i] < 6) {
                    categorizedData[0].push(i);
                }
                if (currentSemester[i] >= 6 && currentSemester[i] < 6.5) {
                    categorizedData[1].push(i);
                }
                if (currentSemester[i] >= 6.5 && currentSemester[i] < 7) {
                    categorizedData[2].push(i);
                }
                if (currentSemester[i] >= 7 && currentSemester[i] < 7.5) {
                    categorizedData[3].push(i);
                }
                if (currentSemester[i] >= 7.5 && currentSemester[i] < 8) {
                    categorizedData[4].push(i);
                }
                if (currentSemester[i] >= 8 && currentSemester[i] < 8.5) {
                    categorizedData[5].push(i);
                }
                if (currentSemester[i] >= 8.5 && currentSemester[i] < 9) {
                    categorizedData[6].push(i);
                }
            }
            setCategorizedData(categorizedData);
        }
        renderBarChart(semesterFilter.cachedArray.map(d => d.length), 'chart');
    }
    return(
        <Layout
        Title='Semester Analysis'
        Content={
            <Chart chartLogic={fetchSemesterMarks} isDataLoaded={semesterFilter.isLoaded}/>
        }
        Filter={
            <Filters filterKey={0}
                filters={['Board', 'Gender', 'Caste', 'Semester', 'SSLC Filter', 'HSC Filter']}/>
        }/>
    )

}

const mapStateToProps = (state: IStoreState) => ({
    semesterFilter: state.filters[0],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCategorizedData(data: number[][]) {
        dispatch(setCachedArray(0, data));
        dispatch(setDataLoaded(0, true));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SemesterAnalysis);