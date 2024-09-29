

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { Message } = require("firebase-functions/v2/pubsub");
const { setGlobalOptions } = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_KEY)

const app = express();
setGlobalOptions({ maxInstances: 10 })

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        Message: "Sucess!",
    });
});

app.post("/payment/create", async (req, res) => {
    const total = parseInt(req.query.total);
    if (total > 0) {
        // console.log("payment recieved", total);
        // res.send(total)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        })
    } else {
        res.status(403).json({
            Message: "Total must be greater than 0",
        });
    }
})



exports.api = onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
