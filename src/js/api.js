const axios = require('axios');
const Cookies = require('js-cookie');


const api = {
    deleteTranslation: function(id) {
        return axios.delete(`/api/translations/${id}/`, {
            headers: {"X-CSRFToken": Cookies.get('csrftoken')}
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    },
    updateTranslation: function(id, data) {
        return axios.put(`/api/translations/${id}/`, data, {
            headers: {"X-CSRFToken": Cookies.get('csrftoken')}
        })
            .then(res => alert("Updated successfully!"))
            .catch(err => alert("Updated failed!"))
    }
};

module.exports = api;