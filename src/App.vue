<template>
  <div id="app"
       class="wrapper">
    <keep-alive exclude="Detail">
      <!-- 让Home不要随意销毁掉 -->
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
