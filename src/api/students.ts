class Students {
  private clientID: string = '';
  private clientSecret: string = '';
  private apiKey: string = '';
  private scope: string = '';
  private sheetID: string = '';
  private discoveryDocs: string[] = [];

  constructor() {    
    const {
      REACT_APP_CLIENT_ID,
      REACT_APP_CLIENT_SECRET,
      REACT_APP_API_KEY
    } = process.env
    if (REACT_APP_CLIENT_ID) {
      this.clientID = REACT_APP_CLIENT_ID;
    }
    if (REACT_APP_CLIENT_SECRET) {
      this.clientSecret = REACT_APP_CLIENT_SECRET;
    }
    if (REACT_APP_API_KEY) {
      this.apiKey = REACT_APP_API_KEY;
    }
    this.scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    this.sheetID = '1gBVGfqmFVOQ2tLj09HEEL854yF3PfvhA4kpGHNgTp5M';
    this.discoveryDocs = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
  }

  init(callback: () => void) {
    if (window.gapi) {
      window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          apiKey: this.apiKey,
          clientId: this.clientID,
          discoveryDocs: this.discoveryDocs,
          scope: this.scope
        });
        callback();
      });
    }
  }

  async getSemesterResults(): Promise<number[][]> {
    const STUDENT_RESULTS_RANGE = 'CSE!S2:W110'
    try {
      const categorizedData: number[][] = [[], [], [], [], []];
      const result: number[][] = await this.read(STUDENT_RESULTS_RANGE);
      result.forEach((res) => {
        res.forEach((stud, index) => categorizedData[index].push(stud));
      });
      return categorizedData;
    } catch (e) {
      throw e;
    }
  }

  async getNames(): Promise<string[]> {
    const NAMES_RANGE = 'CSE!D2:D118';
    const result: string[][] = await this.read(NAMES_RANGE);
    return result.map(d => d[0]);
  }

  async getBoard(): Promise<string[]> {
    const BOARD_RANGE = 'CSE!O2:O118';
    const result: string[][] = await this.read(BOARD_RANGE);
    return result.map(d => d[0]);
  }

  async getGender(): Promise<string[]> {
    const GENDER_RANGE = 'CSE!F2:F118';
    const result: string[][] = await this.read(GENDER_RANGE);
    return result.map(d => d[0]);
  }

  async getQuota(): Promise<string[]> {
    const QUOTA_RANGE = 'CSE!G2:G118';
    const result: string[][] = await this.read(QUOTA_RANGE);
    return result.map(d => d[0]);
  }

  async getCaste(): Promise<string[]> {
    const CASTE_RANGE = 'CSE!H2:H118';
    const result: string[][] = await this.read(CASTE_RANGE);
    return result.map(d => d[0]);
  }

  async getSSLCMarks() {
    const SSLC_RANGE = 'CSE!J2:J118';
    const result: number[][] = await this.read(SSLC_RANGE);
    return result.map(d => d[0]);
  }

  async getHSCMarks() {
    const HSC_RANGE = 'CSE!N2:N118';
    const result: number[][] = await this.read(HSC_RANGE);
    return result.map(d => d[0]);
  }

  async getOverallResults() {
    const STUDENT_RESULTS_RANGE = 'CSE!S2:W110'
    const result: Array<Array<string | number>> = await this.read(STUDENT_RESULTS_RANGE);
    return result;
  }

  async getArrearReport() {
    const ARREAR_RANGE = 'CSE!AB2:AC110';
    const result: Array<Array<string | number>> = await this.read(ARREAR_RANGE);
    return result;
  }

  private async read(range: string): Promise<any> {
    try {
      const response: any = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetID,
        range
      });
  
      return response.result.values;
    } catch (e) {
      throw e;
    }
  }
}

export const students = new Students();
