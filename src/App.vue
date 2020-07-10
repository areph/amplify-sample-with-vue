<template>
  <div id="app">
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
