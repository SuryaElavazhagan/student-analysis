import * as React from 'react';
import api from '../api/APICalls';

export default function StudentAnalysis() {

    async function fetchAllMarks() {
        const allSemesterMarks = await api.fetchAllSemesterMarks();
        const hscMarks = await api.fetchMarks('hsc');
        const sslcMarks = await api.fetchMarks('sslc');
        const currentStudentData = [
            sslcMarks[0],
            hscMarks[0],
            ...allSemesterMarks[0],
        ];

        console.log(currentStudentData);
    }

    fetchAllMarks();
    return(
        <div/>
    )
}