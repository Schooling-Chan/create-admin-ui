<template>
  <div class="container">
    <div class="left">
      123
      <a-button type='primary' @click="toggle">
        我是按钮
      </a-button>
    </div>
    <div class="right">
      <div class="top">
        <div class="top_item">top1</div>
        <div class="top_item">top1</div>
        <div v-show="screen">
          <div class="top_item">top1</div>
        </div>
      </div>
      <div class="middle">middle</div>
      <div class="bottom">
        <div class="item">item1</div>
        <div class="item">item2</div>
        <div class="item">item3</div>
        <div class="item">item4</div>
        <div class="item">item6</div>
        <div class="item">item7</div>
        <div class="item">item8</div>
        <div class="item">item9</div>
        <div class="item">item10</div>
        <div>
          <a-pagination @change="pageChange" :total="50" show-less-items />
        </div>
      </div>
    </div>
  </div>
</template>
<script name="wihabing" setup>
import { nextTick, onMounted, ref } from 'vue'

const screen = ref(false);

const toggle = () =>{
  screen.value = !screen.value;
  nextTick(() => {
    let right = document.querySelector('.right');
    let top = document.querySelector('.top');
    let middle = document.querySelector('.middle');
    let bottom = document.querySelector('.bottom');
    bottom.style.height = right.offsetHeight - top.offsetHeight - middle.offsetHeight -10 -10 + 'px';
  })
  
  
}

const pageChange = (e) => {
  document.querySelector('.bottom').scrollTop = 0;
  let a = document.querySelector('.bottom').scrollTop;
}
onMounted(() =>{
  
  let right = document.querySelector('.right');
  let top = document.querySelector('.top');
  let middle = document.querySelector('.middle');
  let bottom = document.querySelector('.bottom');
  bottom.style.height = right.offsetHeight - top.offsetHeight - middle.offsetHeight -10 -10 + 'px';
})

</script>
<style lang='less' scoped>
.container{
  height: 700px;
  display: flex;
  .left{
    width: 30%;
    border-right: 1px solid #eee;
  }
  .right{
    flex: 1;
    // background: yellow;
    overflow: hidden;
    .top{
      // height: 200px;
      // padding: 50px;
      background: yellowgreen;
      margin-bottom: 10px;
      .top_item{
        height: 80px;
      }
    }
    .middle{
      margin-bottom: 10px;
      height: 350px;
      background: pink;
    }
    .bottom{
      height: 180px;
      overflow-y: auto;
      background: #eee;
      .item{
        background: red;
        height: 80px;
        margin-bottom: 10px;
      }
    }
  }
}

</style>
