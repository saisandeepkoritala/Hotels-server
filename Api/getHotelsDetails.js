const axios = require('axios');

async function getHotelsDetails(arrival,departure,id){
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails',
        params: {
            hotel_id: id,
            arrival_date: arrival,
            departure_date: departure,
            adults: '1',
            children_age: '1,17',
            room_qty: '1',
            languagecode: 'en-us',
            currency_code: 'EUR'
        },
        headers: {
            'X-RapidAPI-Key': '549338403fmsh72e852f8489002dp184afbjsna0359def5579',
            'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
    };

try {
	const response = await axios.request(options);
	return (response.data);
} catch (error) {
	return (error);
}

}

module.exports = getHotelsDetails;