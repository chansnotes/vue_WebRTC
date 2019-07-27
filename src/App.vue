<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <HelloWorld/>
      <RTCPeer/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import RTCPeer from './components/RTCPeer'

export default {
  name: 'App',
  components: {
    HelloWorld,
    RTCPeer
  },
  data: () => ({
    //
  }),
};
</script>
