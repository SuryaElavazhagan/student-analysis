import { apiCall } from './sheets';

export default {
    /**
     * 
     * @param type indicates the type of data to be fetched 'quota', 'gender', 'board', 'name'
     * 
     * @returns an array of strings w.r.t type
     */
    async fetchData(type: string): Promise<string[]> {
        let currentRange = '';
        switch(type) {
            case 'quota': currentRange = 'CSE!G2:G118';
                break;
            case 'gender': currentRange = 'CSE!F2:F118';
                break;
            case 'board': currentRange = 'CSE!L2:L118';
                break;
            case 'names': currentRange = 'CSE!D2:D118';
                break;
        }
        const results: string[][] = await apiCall(currentRange);
        return results.map(name => name[0]);
    },
    /**
     * Fetches the semester GPA results of all students for the given semester
     * 
     * @param type indicates the type of marks need to be fetched 'semester', 'hsc', 'sslc'
     * @param semester indicates the index of the semester, this need to be sent only for type 'semester'
     * 
     * @returns an array of decimal numbers indicating Marks of each students w.r.t type
     */
    async fetchMarks(type: string, semester?: number): Promise<number[]> {
        const SEMESTER_COLUMNS = ['S', 'T', 'U', 'V', 'W'];
        let currentRange = '';
        switch(type) {
            case 'semester': currentRange = `CSE!${SEMESTER_COLUMNS[semester!]}2:${SEMESTER_COLUMNS[semester!]}110`
                break;
            case 'hsc': currentRange = 'CSE!N2:N118';
                break;
            case 'sslc': currentRange = 'CSE!J2:J118';
                break;
            case 'allSemester': currentRange = 'CSE!S2:W110';
                break;
        }
        const results: number[][] = await apiCall(currentRange);
        return results.map(result => result[0]);
    },
    async fetchAllSemesterMarks() : Promise<number[][]> {
        const currentRange = 'CSE!S2:W110';
        const results: number[][] = await apiCall(currentRange);
        return results;
    }
}