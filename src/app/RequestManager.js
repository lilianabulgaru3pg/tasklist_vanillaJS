import 'whatwg-fetch'

class RequestManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async requestData(method, url, data, headersData) {
        try {
            console.log('data', data, 'url', `${this.baseUrl}/${url}`, headersData);
            var response = await fetch(`${this.baseUrl}/${url}`, {
                method: method,
                body: data,
                headers: headersData
            });
            console.log("response", response)
            if (response.status >= 200 || response.status < 300) {
                let responseJSON = this.getJSON(response);
                return responseJSON;
            }

            if (response.status >= 300) {
                throw Error('Error:', response.status)
            }

        } catch (err) {
            throw Error(err);
        }
    }
    async getJSON(response) {
        try {
            const responseBody = await response.json();
            return responseBody;
        } catch (err) {
            throw Error(err)
        }
    }
}

export default new RequestManager('http://localhost:3000');
