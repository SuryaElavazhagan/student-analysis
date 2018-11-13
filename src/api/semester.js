import {
    config
} from './sheetsconfig'
import {
    getData,
    storeData
} from '../storage/localStore'

const gapi = window.gapi

function apiCall(range) {
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.SPREADSHEET_ID,
        range
    }).then(response => {
        return response.result.values
    }, error => {
        console.log(error.message)
        return []
    });
}

async function getSemesterResults() {
    const SEMESTER_ONE_RANGE = 'CSE!S2:S118'
    let result = await apiCall(SEMESTER_ONE_RANGE)
    return result
}

async function getStudentResults() {
    const student_results_id = 'allresults'
    if (getData(student_results_id) === null) {
        const STUDENT_RESULTS_RANGE = 'CSE!S2:W110'
        let result = await apiCall(STUDENT_RESULTS_RANGE)
        storeData(student_results_id, result)
        return result
    }
    return getData(student_results_id)
}

async function getGender() {
    const gender_id = 'gender'
    if (getData(gender_id) === null) {
        const GENDER_RANGE = 'CSE!F2:F118'
        let result = await apiCall(GENDER_RANGE)
        result = result.map(d => d[0])
        storeData(gender_id, result)
        return result
    }
    return getData(gender_id)
}

async function getQuota() {
    const quota_id = 'quota'
    if (getData(quota_id) === null) {
        const QUOTA_RANGE = 'CSE!G2:G118'
        let result = await apiCall(QUOTA_RANGE)
        result = result.map(d => d[0])
        storeData(quota_id, result)
        return result
    }
    return getData(quota_id)
}

async function getBirthday() {
    const birthday_id = 'birthday'
    if (getData(birthday_id) === null) {
        const BIRTHDAY_RANGE = 'CSE!E2:E118'
        let result = await apiCall(BIRTHDAY_RANGE)
        result = result.map(d => d[0])
        storeData(birthday_id, result)
        return result
    }
    return getData(birthday_id)
}

async function getNames() {
    const students_id = 'students'
    if (getData(students_id) === null) {
        const NAMES_RANGE = 'CSE!D2:D118'
        let result = await apiCall(NAMES_RANGE)
        result = result.map(d => d[0])
        storeData(students_id, result)
        return result
    }

    return getData(students_id)
}

async function getCaste() {
    const caste_id = 'caste'
    if (getData(caste_id) === null) {
        const CASTE_RANGE = 'CSE!H2:H118'
        let result = await apiCall(CASTE_RANGE)
        result = result.map(d => d[0])
        storeData(caste_id, result)
        return result
    }

    return getData(caste_id)
}

async function getBoard() {
    const board_id = 'board'

    if (getData(board_id) === null) {
        const BOARD_RANGE = 'CSE!O2:O118'
        let result = await apiCall(BOARD_RANGE)
        result = result.map(d => d[0])
        storeData(board_id, result)
        return result
    }
    return getData(board_id)
}

async function getArrearReport() {
    const arrear_report_id = 'arrear_report'

    if (getData(arrear_report_id) === null) {
        const ARREAR_RANGE = 'CSE!AB2:AC110'
        let result = await apiCall(ARREAR_RANGE)
        storeData(arrear_report_id, result)
        return result
    }
    return getData(arrear_report_id)
}

async function getSSLCMarks() {
    const sslc_id = 'sslc'
    if (getData(sslc_id) === null) {
        const SSLC_RANGE = 'CSE!J2:J118'
        let result = await apiCall(SSLC_RANGE)
        result = result.map(d => d[0])
        storeData(sslc_id, result)
        return result
    }
    return getData(sslc_id)
}

async function getHSCMarks() {
    const hsc_id = 'hsc'
    if (getData(hsc_id) === null) {
        const HSC_RANGE = 'CSE!N2:N118'
        let result = await apiCall(HSC_RANGE)
        result = result.map(d => d[0])
        storeData(hsc_id, result)
    }
    return getData(hsc_id)
}

export {
    getSemesterResults,
    getStudentResults,
    getGender,
    getQuota,
    getBirthday,
    getNames,
    getCaste,
    getBoard,
    getArrearReport,
    getSSLCMarks,
    getHSCMarks
}