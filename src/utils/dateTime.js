


export const getDate = (dateString) => {
    let dateObj = new Date(dateString)
    let date = dateObj.toLocaleString("en-US",{year: "numeric", month: "short", day:"2-digit"})

    return `${date}`
}

export const getTime = (timeString) => {
    let dateObj = new Date(timeString);
    let time = dateObj.toLocaleString("en-US",{hour12:false, hour: "2-digit", minute: "2-digit", second:"2-digit"})
    return `${time}`;
}

export const getDateTime = (dateTimeString) => {
    let date = getDate(dateTimeString);
    let time = getTime(dateTimeString);

    return `${date}, ${time}`;
}