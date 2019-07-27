<template>
    <v-container>
        <v-layout wrap text-center>
            <v-flex>
                <span> This is RTC Peer to Peer Communication</span>
                <video ref="localvideo" id="localvideo" autoplay playsinline></video>
                <video ref="remotevideo" id="remotevideo" autoplay playsinline></video>
            </v-flex>
            <v-flex>
                <v-btn color="success">
                    <span> Start </span>
                </v-btn>
            </v-flex>
            <v-flex>
                <v-btn color="warning">
                    <span> Call </span>
                </v-btn>
            </v-flex>
            <v-flex>
                <v-btn color="error">
                    <span> Turn off </span>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
export default {
    

}
</script>

<style>

</style>