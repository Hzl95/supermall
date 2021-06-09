<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !==0">
    <table :key="index" v-for="(table,index) in paramInfo.sizes" class="info-size">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr :key="index" v-for="(info,index) in paramInfo.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length!==0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style>
.param-info {
  font-size: 0.65rem;
  padding: 0.42rem 0.34rem;
  border-bottom: 0.3rem solid rgba(128, 128, 128, 0.2);
}

.info-size,
.info-param {
  border-bottom: 0.1rem solid rgba(128, 128, 128, 0.5);
  border-collapse: collapse; /* 可以合并邻近的边框，且可以让tr显示出边框 */
  margin: 0 auto;
  margin-bottom: 0.42rem;
  width: 13.568rem;
}
.info-size tr,
.info-param tr {
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.5);
}

.info-size td {
  text-align: left;
  padding-right: 1rem;
  white-space: nowrap;
}
/* .param-info td {
  padding: 0.5rem;
} */

.info-param .info-param-key {
  text-align: left;
  padding: 0.5rem 3.5rem 0.5rem 0rem;
  white-space: nowrap;
}
.info-param .param-value {
  color: var(--color-high-text);
}

.info-img img {
  width: 100%;
}
</style>
