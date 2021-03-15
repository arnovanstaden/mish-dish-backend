const cron = require('node-cron');
const { rebuildFrontend } = "./utils.js"


const rebuildSiteCron = () => {
    // Cron job - rebuild site every hour
    cron.schedule('0 * * * *', () => {
        console.log("Running Cron Job: Rebuild Site")
        rebuildFrontend()
    });
}

module.exports = { rebuildSiteCron }