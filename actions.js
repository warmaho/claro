import * as types from './types'
import moment from "moment";
export const getChannels =  (day) => (dispatch) =>{
    let dateEnd = moment(day, "YYYYMMDD").add(1, 'days')

    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=web61144bb49d549");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    dispatch({ type: types.PENDING, payload:true})
    fetch("https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=guatemala&HKS=web61144bb49d549&user_id=54343080&date_from="+day+"000000&date_to="+dateEnd.format("YYYYMMDD")+"000000&quantity=200", requestOptions)
        .then(response => response.text())
        .then(data => {
            let { channels } = JSON.parse(data).response
            dispatch({ type: types.CHANNELS, payload:channels})
        })
        .catch(error => error && dispatch({ type: types.ERROR, payload:true}))

}
export const setHover =  (hover) => (dispatch) =>{
    dispatch({ type: types.HOVER, payload:hover})


}
