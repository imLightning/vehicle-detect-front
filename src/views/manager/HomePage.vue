<template>
  <div class="bg">
    <h1 class="header">欢迎使用智慧交通车速检测系统</h1>
    <div class="btn">
      <el-button class="button" type="primary" @click="toFilePage()">
        进入工作台<el-icon><ArrowRightBold /></el-icon>
      </el-button>
    </div>
  </div>
</template>
 
<script setup>
// import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowRightBold } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";


const $router = useRouter();


const toFilePage = () => {
  $router.push({ path: "/file" })
}

</script>

<style scoped>
.bg {
  background: url('@/static/pic/background.jpg');
  border-radius: 30px;
  box-shadow: 0 0 5px 1px #999;
  height: 100%;
  padding: 20px;
}

.header {
  color: #ffffff;
  text-shadow: 3px 2px 5px #999;
  text-align: center;
  font-size: 70px;
  margin: 0 0;
  margin-top: 50px;
}



.btn {
  width: 400px;
  height: 150px;
  padding-top: 200px;
  padding-bottom: 320px;
  text-align: center;
  display: block;
  margin: 0 auto;
}

.button {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  font-size: 50px;
  box-shadow: 0 0 20px 10px #67b5ff;
}

el-button {
  color: rgb(255, 171, 103)
}

</style>
