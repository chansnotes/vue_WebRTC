<template>
    <v-container grid-list-md fluid>
        <v-layout wrap text-center>
            <v-flex xs12>
                <span> This is RTC Peer to Peer Communication</span>
            </v-flex>
            <v-flex xs6>
                <video ref="localvideo" id="localvideo" autoplay playsinline width="800" height="600"></video>
            </v-flex>
            <v-flex xs6>
                <video ref="remotevideo" id="remotevideo" autoplay playsinline width="200" height="200"></video>
            </v-flex>
        </v-layout>

        <v-layout wrap text-center>
            <v-flex xs4>    
                <v-btn color="success" block @click="startAction"> 
                    <span> Start </span>
                </v-btn>
            </v-flex>
            <v-flex xs4>
                <v-btn color="warning" block @click="callAction">
                    <span> Call </span>
                </v-btn>
            </v-flex>
            <v-flex xs4>
                <v-btn color="error" block @click="hangup">
                    <span> Turn off </span>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
export default {
  data: () => ({
    video:{},
    localvideo: {},
    remotevideo: {},
    localStream: {type: Object},
    remoteStream: {type: Object},
    localPeerConnection: {type:Object},
    remotePeerConnection: {type:Object},
    offerOptions : {
        offerToReceiveVideo: 1,
    }
  }),
  methods: {
    gotRemoteMediaStream(event) {
        // console.log('Remote stream added.');
        const mediaStream = event.stream;

        this.remotevideo = this.$refs.remotevideo;
        this.remotevideo.srcObject = mediaStream;
        this.remoteStream = mediaStream;
    },
    startAction() {
        navigator.mediaDevices.getUserMedia({video:true})
            .then((stream) => {
                this.localvideo = this.$refs.localvideo;
                this.localvideo.srcObject = stream;
                this.localStream = stream;
            }).catch(error => {})
    },
    handleConnection(event) {
        const peerConnection = event.target;
        const iceCandidate = event.candidate;

        // console.log('handleIceCandidate event: ', event);
        if (iceCandidate) {
            const newIceCandidate = new RTCIceCandidate(iceCandidate);
            const otherPeer = this.getOtherPeer(peerConnection);

            otherPeer.addIceCandidate(newIceCandidate)
            .then(() => {
                
            }).catch((error) => {
            });
        }     
    },
    callAction() {
        console.log('Call Action called');
        this.localStream = this.localvideo.srcObject;
        const videoTracks = this.localStream.getVideoTracks();

        this.localPeerConnection = new RTCPeerConnection(null);
        console.log(this.localPeerConnection);
        this.localPeerConnection.onicecandidate = this.handleConnection;
        console.log(this.localPeerConnection.onicecandidate);

        this.remotePeerConnection = new RTCPeerConnection(null);
        this.remotePeerConnection.onicecandidate = this.handleConnection;

        this.remotePeerConnection.onaddstream = this.gotRemoteMediaStream;
        console.log(this.remotePeerConnection);

        this.localPeerConnection.addStream(this.localStream);
        this.localPeerConnection.createOffer(this.offerOptions)
            .then(this.createdOffer).catch((error)=>{});

    },
    getPeerName(peerConnection) {
        return (peerConnection == this.localPeerConnection) ?
            'localPeerConnection' : 'remotePeerConnection';
    },
    getOtherPeer(peerConnection) {
        return (peerConnection == this.localPeerConnection) ?
            this.remotePeerConnection : this.localPeerConnection;
    },
    setDescriptionSuccess(peerConnection, functionName){
        const peerName = this.getPeerName(peerConnection);
    },
    setLocalDescriptionSuccess(peerConnection) {
        this.setDescriptionSuccess(peerConnection, 'setLocalDescription');
    },
    setRemoteDescriptionSuccess(peerConnection) {
        this.setDescriptionSuccess(peerConnection, 'setRemoteDescription');
    },
    createdOffer(description) {
        console.log('createdOffer', description);
        this.localPeerConnection.setLocalDescription(description)
            .then(()=> {
                this.setLocalDescriptionSuccess(this.localPeerConnection);
            }).catch((error)=> {});

        this.remotePeerConnection.setRemoteDescription(description)
            .then(() => {
                this.setRemoteDescriptionSuccess(this.remotePeerConnection);
            }).catch((error) => {})
        
        this.remotePeerConnection.createAnswer()
            .then(this.createdAnswer)
            .catch((error) => {})
    },
    createdAnswer(description) {
        this.remotePeerConnection.setLocalDescription(description)
            .then(() => {
                this.setLocalDescriptionSuccess(this.remotePeerConnection);
            }).catch((error) => {});

        this.localPeerConnection.setRemoteDescription(description)
            .then(() => {
                this.setRemoteDescriptionSuccess(this.localPeerConnection);
            }).catch((error) => {});
    },
    hangup() {
        this.localPeerConnection.close();
        this.remotePeerConnection.close();
        this.localPeerConnection = null;
        this.remotePeerConnection = null;

        this.localStream = this.localvideo.srcObject;    
        this.localStream.getTracks()[0].stop();

    }

  }
};
</script>

<style>

</style>