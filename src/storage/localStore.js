const storeData = (data_id ,data) => {
    localStorage.setItem(data_id, JSON.stringify(data))
}

const getData = (data_id) => {
    return JSON.parse(localStorage.getItem(data_id))
}



export {
    storeData,
    getData
}