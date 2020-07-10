<template>
  <div id="app">
    <amplify-authenticator v-bind:authConfig="authConfig" />
    <div id="nav">
      <router-link to="/ai">AIアプリ</router-link> |
      <router-link to="/chat">Chatアプリ</router-link> |
      <router-link to="/analytics">分析アプリ</router-link> |
      <router-link to="/webpush">WebPushアプリ</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style src="./assets/style.css" />

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      authConfig: {
        signupConfig: {
          defaultCountryCode: "44",
          hiddenDefaults: ['phone_number']
        }
      }
    }
  }
})
</script>
