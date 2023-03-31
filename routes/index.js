'use strict';
const router = require('express').Router();
const WhatsappCloudAPI = require('whatsappcloudapi_wrapper');

const MetaConfig = {
    accessToken: '',
    senderPhoneNumberId: '',
    WABA_ID: '',
    graphAPIVersion: '',
    Meta_WA_VerifyToken:''
};

const Whatsapp = new WhatsappCloudAPI(MetaConfig);

router.get('/', (req, res) => res.send('Hola Meta!'));

router.post('/meta_wa_callbackurl', async (req, res) => {
    try {
        // console.log('POST: Someone is pinging me!');
        let data = Whatsapp.parseMessage(req.body);
        let incomingMessage = data.message;
        let recipientPhone = incomingMessage.from.phone; // extract the phone number of sender
        let recipientName = incomingMessage.from.name;
        let typeOfMsg = incomingMessage.type; // extract the type of message (some are text, others are images, others are responses to buttons etc...)
        let message_id = incomingMessage.message_id; // extract the message id


        if (data?.isMessage) {
        }

        return res.sendStatus(200);
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});

router.get('/meta_wa_callbackurl', (req, res) => {
    try {
        console.log('GET: Someone is pinging me!');

        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        if (
            mode &&
            token &&
            mode === 'subscribe' &&
            MetaConfig.Meta_WA_VerifyToken === token
        ) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});
module.exports = router;
