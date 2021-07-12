<template>
  <div class="detail">
    <mt-popup position="right" class="mint-popup" v-model="popupVisible">
      <mt-button @click.native="popupVisible3 = false" size="large" type="primary"></mt-button
    ></mt-popup>
  </div>
</template>

<script>
export default {
  name: 'detail',
  props: ['detailData', 'popupVisible'],
  data() {
    return {}
  },
  mounted() {
    console.log(this.detailData)
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mint-popup {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
