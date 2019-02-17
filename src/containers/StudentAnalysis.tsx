import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Filters from 'src/components/Filters';
import Layout from 'src/components/Layout';
import { setCachedArray, setDataLoaded } from 'src/store/actions/filterActions';
import { IFilter, IStoreState } from 'src/store/types';
import api from '../api/APICalls';
import Chart from './Chart';

interface IStudentAnalysisProps {
    semesterFilter: IFilter;
    setCategorizedData: (data: number[][]) => void;
}

function StudentAnalysis({semesterFilter, setCategorizedData}: IStudentAnalysisProps) {

    async function fetchAllMarks() {
        if(!semesterFilter.isLoaded) {
            const allSemesterMarks = await api.fetchAllSemesterMarks();
            const hscMarks = await api.fetchMarks('hsc');
            const sslcMarks = await api.fetchMarks('sslc');
            const currentStudentData = [
                sslcMarks[0],
                hscMarks[0],
                ...allSemesterMarks[0],
            ];
            setCategorizedData([currentStudentData]);
        }
        
    }

    return(
        <Layout
        Title='Semester Analysis'
        Content={
            <Chart chartLogic={fetchAllMarks} isDataLoaded={semesterFilter.isLoaded}/>
        }
        Filter={
            <Filters filterKey={1}
                filters={['Board', 'Gender', 'Caste', 'Semester', 'SSLC Filter', 'HSC Filter']}/>
        }/>
    )
}

const mapStateToProps = (state: IStoreState) => ({
    semesterFilter: state.filters[1],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCategorizedData(data: number[][]) {
        dispatch(setCachedArray(1, data));
        dispatch(setDataLoaded(1, true));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAnalysis);