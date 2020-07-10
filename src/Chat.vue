<template>
  <div>
    <div class="title">チャットアプリ</div>
    <div class="main-contents">
      <div v-for="message in messages" :key="message.id">
        <div
          v-bind:class="[
            message.username === userName ? 'message' : 'message_opponent',
          ]"
        >
          {{ message.content }}
        </div>
      </div>
      <div
        v-bind:class="[
          message.username === userName ? 'username' : 'username_opponent',
        ]"
      >
        {{ message.username }}
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

    sendMessage() {

    }

    fetch() {

    }

    subscribe() {

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

    }

    // updated = scrollBottom();
}
</script>

<style lang="scss" scoped></style>
