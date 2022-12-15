import moment from 'moment';
import { BASE_URL } from "../config/constants"

export const getCitiesListEndpoint = () => {
    return `${BASE_URL}cities?limit=100&page=1&offset=0&sort=asc&country_id=DE&order_by=city`;
}

export const getCityInfoEndpoint = (country, city) => {
    return `${BASE_URL}latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=${country}&city=${city}&order_by=lastUpdated&dumpRaw=false`;
}

export const formatDate = (dateString) => {
    console.log('dateString --->',dateString);
   return moment(dateString).format('YYYY-MM-DD');
}