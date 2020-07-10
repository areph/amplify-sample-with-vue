<template>
  <div id="app">
    <div v-if="signedIn">
      <div id="nav">
        <div class="amplify-sign-out">
          <amplify-sign-out />
          ようこそ、{{username}} さん!
        </div>
        <li>
          <router-link to="/ai">AIアプリ</router-link> |
        </li>
        <li>
          <router-link to="/chat">Chatアプリ</router-link> |
        </li>
        <li>
          <router-link to="/analytics">分析アプリ</router-link> |
        </li>
        <li>
          <router-link to="/webpush">WebPushアプリ</router-link> |
        </li>
      </div>
      <router-view/>
    </div>
    <div v-else>
      <amplify-authenticator v-bind:authConfig="authConfig" />
    </div>
  </div>
</template>

<style src="./assets/style.css" />

<script lang="ts">
import { Auth } from 'aws-amplify'
import { AmplifyEventBus }  from 'aws-amplify-vue'
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class App extends Vue {
  name = 'app'
  signedIn = false
  username = ''
  public authConfig = {
    signUpConfig: {
      defaultContryCode: "44",
      hiddenDefaults: ["phone_number"]
    }
  }

  async beforeCreate() {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser()
      this.signedIn = true
      this.username = cognitoUser.username
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', async (info: string) => {
      if (info === 'signedIn') {
        const cognitoUser = await Auth.currentAuthenticatedUser()
        this.signedIn = true
        this.username = cognitoUser.username
      } else {
        this.signedIn = false
      }
    })
  }
}
</script>
