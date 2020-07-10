<template>
  <div>
    <div class="title">チャットアプリ</div>
    <div class="main-contents">
      <div class="message_base">
        <div v-for="message in messages" :key="message.id">
          <div v-bind:class="[message.username === userName ? 'message' : 'message_opponent']">
            {{ message.content }}
          </div>
          <div v-bind:class="[message.username === userName ? 'username' : 'username_opponent']">
            {{message.username}}<span v-bind:class="[message.username === userName ? 'senddate' : 'senddate_opponent']">{{message.createdAt}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-input
      placeholder="メッセージを入力(Enterで送信)"
      v-model="content"
      @keydown.enter.native="sendMessage"
    ></el-input>
    <div class="error">{{ this.error }}</div>
  </div>
</template>

<script lang="ts">
import API, { graphqlOperation } from '@aws-amplify/api';
import { Auth } from "aws-amplify";
import { createMessage } from "./graphql/mutations";
import { listMessages } from './graphql/queries';
import { onCreateMessage } from "./graphql/subscriptions";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Chat extends Vue {
    name = "chat";
    messages = [];
    content = '';
    userName = '';
    subscription = {};
    error = '';

    sendMessage(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
      if (event.keyCode !== 13 || this.content == "") return;
      const message = {
        id: new Date().getTime() + this.userName,
        username: this.userName,
        content: this.content
      }
      API.graphql(graphqlOperation(createMessage, {input: message})).catch(error => this.error = JSON.stringify(error))
      this.content = "";

    }

    fetch() {
      API.graphql(graphqlOperation(listMessages, { limit: 100 }))
        .then(messages => this.messages = messages.data.listMessages.items.sort((a, b) => a.id > b.id ? 1: -1))
        .catch(error => this.error = JSON.stringify(error));
    }

    subscribe() {
      this.subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
        next: (eventDate) => {
          const message = eventDate.value.data.onCreateMessage;
          this.messages.push(message);
        }
      })

    }

    scrollBottom() {
      const container = this.$el.querySelector('.message_base');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }

    async created() {
      this.userName = (await Auth.currentAuthenticatedUser()).username;
      this.fetch();
      this.subscribe();
    }

    beforeDestroy() {
      this.subscription.unsubscribe();
    }

    updated() {
      this.scrollBottom();
    }
}
</script>

<style src="./assets/chat.css" />
