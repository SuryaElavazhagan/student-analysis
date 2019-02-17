import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { apiCall } from 'src/api/sheets';
import renderPieChart from 'src/charts/pieChart';
import Filters from 'src/components/Filters';
import Layout from 'src/components/Layout';
import { IFilter, IStoreState } from 'src/store/types';
import { setCachedArray, setDataLoaded } from '../store/actions/filterActions';
import Chart from './Chart';

interface IArrearAnalysisProps {
    semesterFilter: IFilter;
    setCategorizedData: (data: number[][]) => void;
}

function ArrearAnalysis({semesterFilter, setCategorizedData}: IArrearAnalysisProps) {

    async function fetchArrearResults() {
        if(!semesterFilter.isLoaded) {
            const ARREAR_RANGE = 'CSE!AB2:AC110';
            const results: number[][] = await apiCall(ARREAR_RANGE);

            const HOA: number[][] = [[], [], [], [], [], []];
            const SA: number[][] = [[], [], [], [], [], []];
            
            results.forEach((arrearReport, index) => {
                if(arrearReport[0] >=1 && arrearReport[0] < 5){ SA[1].push(index)}
                else if(arrearReport[0] >=5 && arrearReport[0] < 10){ SA[2].push(index)}
                else if(arrearReport[0] >=10 && arrearReport[0] < 15){ SA[3].push(index)}
                else if(arrearReport[0] >=15 && arrearReport[0] < 20){ SA[4].push(index)}
                else if(arrearReport[0] >=20){ SA[5].push(index)}
                else { SA[0].push(index) }

                if(arrearReport[1] >=1 && arrearReport[1] < 5){ HOA[1].push(index)}
                else if(arrearReport[1] >=5 && arrearReport[1] < 10){ HOA[2].push(index)}
                else if(arrearReport[1] >=10 && arrearReport[1] < 15){ HOA[3].push(index)}
                else if(arrearReport[1] >=15 && arrearReport[1] < 20){ HOA[4].push(index)}
                else if(arrearReport[1] >=20){ HOA[5].push(index)}
                else { HOA[0].push(index) }
            })
            setCategorizedData(SA);
        }
        renderPieChart(semesterFilter.cachedArray.map(standingArrear => standingArrear.length), 'chart');
    }

    return(
        <Layout
        Title='Arrear Analysis'
        Content={
            <Chart chartLogic={fetchArrearResults} isDataLoaded={semesterFilter.isLoaded}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArrearAnalysis);