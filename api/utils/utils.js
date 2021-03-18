const axios = require("axios");

const rebuildFrontend = () => {
    axios({
        method: "post",
        url: "https://api.vercel.com/v1/integrations/deploy/prj_lTySTMvdxWunsLuOtfmaq01KlEZS/EyVC9kw60e"
    })
        .then(result => {
            console.log("rebuild request sent")
        })
        .catch(err => console.log(err))
}


module.exports = { rebuildFrontend }