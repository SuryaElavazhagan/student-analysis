const {
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_API_KEY
} = process.env

const config = {
    CLIENT_ID: REACT_APP_CLIENT_ID,
    CLIENT_SECRET: REACT_APP_CLIENT_SECRET,
    API_KEY: REACT_APP_API_KEY,
    DISCOVERY_DOCS: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    SCOPES: "https://www.googleapis.com/auth/spreadsheets.readonly",
    //SPREADSHEET_ID : '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    SPREADSHEET_ID: '1gBVGfqmFVOQ2tLj09HEEL854yF3PfvhA4kpGHNgTp5M'
}

const initiateClient = () => {
    const gapi = window.gapi
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: config.API_KEY,
            clientId: config.CLIENT_ID,
            discoveryDocs: config.DISCOVERY_DOCS,
            scope: config.SCOPES
        })
    })
}

export {
    config,
    initiateClient
}