
const API_URL = 'https://aravindtwitter.herokuapp.com/twittersearch?key';

export default async function apiCaller(endpoint, method = 'get', body = {}, authorization = false) {
  let headers = {
    Accept: 'application/json'
  };
  let options = {
    headers,
    method
  };

  try {
    const response = await fetch(`${API_URL}=${endpoint}`, options);
    return response.json();
  } catch (error) {
    return error;
	}

}
