const Subscription = require("../models/Subscription");
const mongoose = require("mongoose");
const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:themishdish@webdacity.dev',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const sendNotification = (pushSubscription, payload) => {
    webpush.sendNotification(pushSubscription, payload)
        .catch((err) => {
            if (err.statusCode === 410) {
                return unSubscribe(pushSubscription)
            } else {
                console.log('Subscription is no longer valid: ', err)
            }
        })
}

const subscribe = async (pushSubscription, notify) => {
    let payload = {
        title: "New Recipe Notifications",
        text: "You will be notified when new recipes are added to The Mish Dish!",
        primaryKey: 1
    }
    // Save to DB
    const subscription = new Subscription({
        _id: new mongoose.Types.ObjectId(),
        subscription: pushSubscription
    })
    await subscription.save().then((res) => {
        console.log(`Subscribed. Notify: ${notify}`);
        if (notify) {
            sendNotification(pushSubscription, JSON.stringify(payload))
        }
    }
    ).catch(err => {
        console.log("Error Subscribing")
        return
    })
}

const unSubscribe = async (pushSubscription) => {
    // Delete from DB
    await Subscription.findOneAndDelete({ subscription: pushSubscription }, (err, res) => {
        if (err) {
            console.log(err)
        }
        console.log("Unsubscribed")
    })
}

const newRecipeNotification = async (recipe) => {
    console.log("New Recipe Notification")
    let payload = {
        title: "New Recipe Added",
        text: `The Mish Dish added a new recipe: ${recipe.name}`,
        url: `https://themishdish.co.za/recipes/${recipe._id}`,
        primaryKey: 2
    }

    // Send
    const subscriptions = await Subscription.find().then(result => result)
    subscriptions.forEach(subscription => {
        webpush.sendNotification(subscription.subscription, JSON.stringify(payload));
    })

}

module.exports = { sendNotification, subscribe, unSubscribe, newRecipeNotification }

