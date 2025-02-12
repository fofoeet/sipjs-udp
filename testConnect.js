const SIPUDP = require('./src/index.js')
let user = '01011112222'; // Update your sip user
let password = 'yyyyyyy'; // Update your sip password
let ip = '127.0.0.1'; // Update your sip ip
let port = '5090'; // Update your sip port
let uri = `${user}@${ip}:${port}`; // Update your sip uri

class MediaHandler {
    constructor(session) {
        this.session = session
    }
    close() {}
    render() {}
    mute() {}
    unmute() {}
    getDescription(onSuccess, onFailure, mediaHint) {}
    setDescription(description, onSuccess, onFailure) {}
}


const server = new SIPUDP.UA({
    // provide a valid URI here
    // The host and port are used to start the server
    uri: uri,

    bind: ip,


    // auto start...
    autostart: true,

    // no need to register since we are UAS
    register: false,

    // trace sip or not
    traceSip: true,

    // enable UAS support
    doUAS: true,

    // Custom media handler - Enabled for custom media handling
    mediaHandlerFactory: (session) => {
        return new MediaHandler(session)
    }
})

server.on('connected', () => {
    console.log('SIP server started man')
})

server.on('disconnected', () => {
    console.log('SIP server stopped')
})

server.on('register', (session) => {
    console.log('SIP register recv')
    console.log(session)
})

server.on('invite', (session) => {
    console.log('SIP INVITE recv')
    console.log(session)
})

setTimeout(makeCall, 2000);

function makeCall() {
    console.log("execute makeCall");
    const session = server.invite(`01036621875@${ip}:${port}`, {
        sessionDescriptionHandlerOptions: {
            constraints: {
                audio: true,
                video: false
            }
        },
        media: {
            remote: {
                //audio: document.getElementById('remoteVideo')
            },
            local: {
                //audio: document.getElementById('localVideo')
            }
        },
        inviteWithoutSdp: false,
        extraHeaders: [
            "History-Info: <sip:01047009009@sktims.net?Privacy=history&Reason=SIP%3Bcause%3D302%3Btext%3DUnconditional>;index=1,<sip:1521300900@sktims.net>;index=1.1",
            "P-Asserted-Identity: <sip:01077777777@127.0.0.1>",
            "P-SKT-User-Svc-Info: 8090A3",
            "P-SKT-CPC: 0A"
        ]
    });
    session.on("accepted", function (data) {
        console.log(data)
    })
}