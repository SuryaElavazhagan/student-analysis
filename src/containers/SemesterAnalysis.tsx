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
            const { semester, board, gender, caste } = semesterFilter;
            const currentSemester = await api.fetchMarks('semester', semester - 1);
            let boardData: string[] = [];
            let genderData: string[] = [];
            let casteData: string[] = [];
            // let sslcData: number[] = [];
            // let hscData: number[] = [];

            if(board !== "Both" && board !== "") {
                boardData = await api.fetchData('board');
            }
            if(gender !== "Both" && gender !== "") {
                genderData = await api.fetchData('gender');
            }
            if(caste !== "") {
                casteData = await api.fetchData("caste");
            }
            // if(secondarySchoolFilter !== "") {
            //     sslcData = await api.fetchMarks("sslc");
            // }
            // if(highSchoolFilter !== "") {
            //     hscData = await api.fetchMarks("hsc");
            // }

            const categorizedData: number[][] = [[], [], [], [], [], [], []];
    
            for (let i = 0; i < currentSemester.length; i++) {
                const boardFilter = boardData.length ? boardData[i].toLowerCase().includes(board.toLowerCase()) : true;
                const genderFilter = genderData.length ? genderData[i].toLowerCase() === gender.toLowerCase() : true;
                const casteFilter = casteData.length ? casteData[i].toLowerCase() === caste.toLowerCase() : true;

                const filterCondition = ((boardFilter || board === "Both") &&
                                        (genderFilter || gender === "Both") &&
                                        (casteFilter || caste === ""));

                if (currentSemester[i] >= 5 && currentSemester[i] < 6 && filterCondition) {
                    categorizedData[0].push(i);
                }
                else if (currentSemester[i] >= 6 && currentSemester[i] < 6.5 && filterCondition) {
                    categorizedData[1].push(i);
                }
                else if (currentSemester[i] >= 6.5 && currentSemester[i] < 7 && filterCondition) {
                    categorizedData[2].push(i);
                }
                else if (currentSemester[i] >= 7 && currentSemester[i] < 7.5 && filterCondition) {
                    categorizedData[3].push(i);
                }
                else if (currentSemester[i] >= 7.5 && currentSemester[i] < 8 && filterCondition) {
                    categorizedData[4].push(i);
                }
                else if (currentSemester[i] >= 8 && currentSemester[i] < 8.5 && filterCondition) {
                    categorizedData[5].push(i);
                }
                else if (currentSemester[i] >= 8.5 && currentSemester[i] < 9 && filterCondition) {
                    categorizedData[6].push(i);
                }
            }
            setCategorizedData(categorizedData);
        } else {
            renderBarChart(semesterFilter.cachedArray.map(d => d.length), 'chart');
        }
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SemesterAnalysis);