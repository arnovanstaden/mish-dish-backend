const axios = require("axios");

const rebuildFrontend = () => {
    axios({
        method: "post",
        url: "https://api.vercel.com/v1/integrations/deploy/prj_zhbMslwzBDnDUS5qc2N8450qDNxa/rwRPTiVefg"
    })
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err))
}

module.exports = { rebuildFrontend }