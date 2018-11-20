import 'whatwg-fetch'

class RequestManager {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getItemsForTask(url) {
        try {
            console.log('data', url);
            var response = await fetch(`${this.baseUrl}/${url}`)

            if (response.status === 200) {
                let responseJSON = this.getJSON(response);
                return responseJSON;
            }

            if (response.status >= 200) {
                throw Error('Error:', response.status)
            }

        } catch (err) {
            throw Error(err);
        }
    }

    async postData(url, data) {
        try {
            console.log('data', data);
            var response = await fetch(`${this.baseUrl}/${url}`, {
                method: 'POST',
                body: data
            });
            console.log("response", response)
            if (response.status === 200) {
                let responseJSON = this.getJSON(response);
                return responseJSON;
            }

            if (response.status >= 200) {
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
