import pusher from 'pusher';
import { PUSHER } from '../config'

class Pusher {
    constructor() {
        this.pusher = new pusher({
            appId: PUSHER.APP_ID,
            key: PUSHER.APP_KEY,
            secret: PUSHER.APP_SECRET,
            cluster: PUSHER.APP_CLUSTER,
            useTLS: true
        });
    }

    authorizeChannel(socketId, channel, userData) {
        const auth = this.pusher.authorizeChannel(socketId, channel, userData);
        return auth;
    }   

    authenticateUser(socketId, userData) {  
        const userAuth = this.pusher.authenticateUser(socketId, userData);
        return userAuth;
    }

    async trigger(channel, event, data, params = {}) {
        const result = await this.pusher.trigger(channel, event, data, params);
        return result;
    }
}

module.exports = new Pusher();