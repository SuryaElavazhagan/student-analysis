import * as React from 'react';
// import { apiCall } from 'src/api/sheets';
// import renderPieChart from 'src/charts/pieChart';
// import Filters from 'src/components/Filters';
// import Layout from 'src/components/Layout';
// import Chart from './Chart';

export default function ArrearAnalysis() {

    // async function fetchArrearResults() {
    //     const ARREAR_RANGE = 'CSE!AB2:AC110';
    //     const results: number[][] = await apiCall(ARREAR_RANGE);

    //     const HOA: number[][] = [[], [], [], [], [], []];
    //     const SA: number[][] = [[], [], [], [], [], []];
        
    //     results.forEach((arrearReport, index) => {
    //         if(arrearReport[0] >=1 && arrearReport[0] < 5){ SA[1].push(index)}
    //         else if(arrearReport[0] >=5 && arrearReport[0] < 10){ SA[2].push(index)}
    //         else if(arrearReport[0] >=10 && arrearReport[0] < 15){ SA[3].push(index)}
    //         else if(arrearReport[0] >=15 && arrearReport[0] < 20){ SA[4].push(index)}
    //         else if(arrearReport[0] >=20){ SA[5].push(index)}
    //         else { SA[0].push(index) }

    //         if(arrearReport[1] >=1 && arrearReport[1] < 5){ HOA[1].push(index)}
    //         else if(arrearReport[1] >=5 && arrearReport[1] < 10){ HOA[2].push(index)}
    //         else if(arrearReport[1] >=10 && arrearReport[1] < 15){ HOA[3].push(index)}
    //         else if(arrearReport[1] >=15 && arrearReport[1] < 20){ HOA[4].push(index)}
    //         else if(arrearReport[1] >=20){ HOA[5].push(index)}
    //         else { HOA[0].push(index) }
    //     })

    //     renderPieChart(SA.map(standingArrear => standingArrear.length), 'chart');
    // }

    return(
        <div/>
    )
}