const cron = require("node-cron");
const axios = require("axios");
const Client = require('@infosimples/node_two_captcha');

require("dotenv").config();

const API = process.env.CAPTCHA_API;
const client = new Client(API, {
    timeout: 60000,
    polling: 5000,
    throwErrors: false
});


cron.schedule('*/5 * * * *', () => {
    console.log('run')
    client.decodeRecaptchaV2({
        googlekey: '6LcePx4eAAAAADL6t4_wqXgvtTgBB6epxA0PtVbj',
        pageurl: 'https://faucet.fantom.network'
    }).then(function (response) {
        return axios.post('https://faucet.fantom.network/api/request/ftm/0x1C43A6e1C23b5A39D0C2080aC018bFa08e9Dd6bd',
            {captchaValue: response.text}
        )
            .then(({data}) => console.log(data))
            .catch(console.log)
    });
});

