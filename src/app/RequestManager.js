import 'whatwg-fetch'
const { Url } = require('url');

class RequestManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async requestData(method, urlPath, data = null, headersData = {}, params = '') {
        try {
            var Url = new URL(`${this.baseUrl}/${urlPath}`);
            if (params) {

                Object.keys(params).forEach(key => Url.searchParams.append(key, params[key]))
            }

            console.log('data', data, 'url', Url, headersData, 'params', params);
            var response = await fetch(Url, {
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
