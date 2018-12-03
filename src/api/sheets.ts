const { REACT_APP_API_KEY, REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

const config = {
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    REACT_APP_API_KEY,
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
    SPREADSHEET_ID: '1gBVGfqmFVOQ2tLj09HEEL854yF3PfvhA4kpGHNgTp5M'
}

const gapi = (window as any).gapi;

export const initiateClient = (callBack: () => void) => {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: config.REACT_APP_API_KEY,
            clientId: config.REACT_APP_CLIENT_ID,
            discoveryDocs: config.DISCOVERY_DOCS,
            scope: config.SCOPES
        }).then(() => {
            callBack()
        })
    })
}

export function apiCall(range : string): any[] {
    return gapi.client.sheets.spreadsheets.values.get({
        range,
        spreadsheetId: config.SPREADSHEET_ID
    }).then((response : any) => {
        return response.result.values
    }, (error: any) => {
        return []
    });
}
