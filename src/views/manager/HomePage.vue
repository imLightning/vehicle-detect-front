<template>
  <div class="bg">
    <h1 class="header">欢迎使用智慧交通车速检测系统</h1>
    <e-row class="row">
      <e-col :span="12" class="char-zx">
        <div class="chart-container" ref="chartRef"></div>
      </e-col>
      <e-col :span="6" class="btn-div">
        <div class="btn">
          <el-button class="button" type="primary" @click="toFilePage()">
            进入工作台<el-icon><ArrowRightBold /></el-icon>
          </el-button>
        </div>
      </e-col>
    </e-row>
  </div>
</template>
 
<script setup>
//引入echarts
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowRightBold } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";


const $router = useRouter();

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)

  const data = [
    { name: '<20', value: 10 },
    { name: '20~30', value: 20 },
    { name: '30~40', value: 15 },
    { name: '40~50', value: 30 },
    { name: '50~60', value: 50 },
    { name: '60~70', value: 40 },
    { name: '70~80', value: 12 },
    { name: '>80', value: 10 }
  ]

  // 配置项
  const options = {
    title: {
      text: '车辆速度数据',
      subtext: '车辆速度分布折线图',
      x: 'center'
    },
    xAxis: {
      name: '速度(km/h)',
      type: 'category',
      data: data.map((item) => item.name),
      axisTick: {
        show: false
      },

    },
    yAxis: {
      name: '车辆数(辆)',
      type: 'value'
    },
    series: [
      {
        data: data.map((item) => item.value),
        type: 'line', 
        smooth: true,
        emphasis: {
          itemStyle: {
            borderWidth: 6,
            shadowBlur: 10, 
            shadowColor: '#ccc'
          }
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    }
  }

  // 设置图表配置项
  chartInstance.setOption(options)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

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
  text-align: center;
  font-size: 50px;
  margin: 0 0;
}

.char-zx{
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px 1px #999;
  margin: 30px 10px;
}

.chart-container {
  width: 600px;
  height: 400px;
  margin: 40px 10px;
  border-radius: 30px;
  background-color: rgb(185, 225, 255);
  box-shadow: 0 0 5px 1px rgb(185, 225, 255);
}


.btn-div {
  width: auto;
  height: 500px;
}

.btn {
  width: 400px;
  height: 150px;
  padding-top: 200px;
  padding-left: 150px;
}

.button {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  font-size: 50px;
}
</style>
