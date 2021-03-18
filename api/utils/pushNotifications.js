const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:themishdish@webdacity.dev',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const sendNotification = (pushSubscription) => {
    // This is the same output of calling JSON.stringify on a PushSubscription
    webpush.sendNotification(pushSubscription, 'Your Push Payload Text');
}

module.exports = { sendNotification }

