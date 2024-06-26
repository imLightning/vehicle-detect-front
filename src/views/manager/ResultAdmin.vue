<template>
    <div>
        <el-table :data="data.file" style="width: 100%">
            <el-table-column prop="id" label="序号" width="120" />
            <el-table-column prop="filename" label="录像"/>
            <!-- <el-table-column prop="state" label="状态" width="120" /> -->
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="info" label="信息" width="120" v-if="0"/>
            <el-table-column fixed="right" label="操作" min-width="120">
            <template v-slot="scope">
                <el-button link type="primary" size="small" @click="showInfo(scope.row.info)">详情</el-button>
                <el-button link type="danger" size="small" @click="handle_del(scope.row.id, scope.row.filename)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="infoDialog" title="车辆信息数据" width="850">
        <el-button-group>
            <el-button type="primary" @click="showZX">查看折线图</el-button>
            <el-button type="primary" @click="showB">
            查看饼状图
            </el-button>
        </el-button-group>
        <el-dialog v-model="innerDialog" title="车辆速度占比" width="800" append-to-body>
            <div class="chartB" id="chartB"></div>
            <div>
                总车次：{{ cnt }}辆
            </div>
            <div>
                超速车次：{{ speeding }}辆
            </div>
        </el-dialog>

        <div class="chartZX" id="chartZX"></div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="openInner = false">关闭</el-button>
                <el-button type="primary" @click="openInner()">
                查看饼状图
                </el-button>
            </div>
        </template>

        
    </el-dialog>
</template>

<script setup>
//引入echarts
import * as echarts from 'echarts';
import { getRes, delRes } from '@/api/result'
import { ref, reactive } from 'vue'
import { secondaryConfirm } from '@/utils/popups'

const data = reactive({
    file: [],
    speedInfo: {},
    cntInfo: [0, 0, 0, 0, 0, 0, 0]
})

const load = () => {
    getRes().then(res => {
        data.file = res.data
        cnt.value = 0
    }).catch(() => {})
}

load()

const handle_del = (id, filename) => {
    secondaryConfirm().then(() => {
        delRes({
            id,
            filename
        }).then(() => {
            load()
        }).catch(() => {})
    }).catch(() => {

    })
}

const cnt = ref(0)

// const chartCnt = reactive([0, 0, 0, 0, 0, 0, 0])

const infoDialog = ref(false)
const echartsX = ['<80', '80~90', '90~100', '100~110', '110~120', '120~130', '>130']

const showInfo = (info) => {
    cnt.value = Object.keys(data.speedInfo).length
    data.speedInfo = JSON.parse(info)
    infoDialog.value = true;
    count(data.speedInfo)
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartZX"))
        infoChart.setOption(optionZX)
    }, 1) 
}

const innerDialog = ref(false)

const openInner = () => {
    cnt.value = Object.keys(data.speedInfo).length
    innerDialog.value = true;
    count(data.speedInfo)
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartB"))
        infoChart.setOption(optionB)
    })
}

const showZX = () => {
    cnt.value = Object.keys(data.speedInfo).length
    infoDialog.value = true;
    count(data.speedInfo)
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartZX"))
        infoChart.setOption(optionZX)
    }, 1) 
}

const showB = () => {

}


const optionZX = reactive({
    title: {
        text: '车辆速度数据',
        subtext: '车辆速度分布折线图',
        x: 'center'
    },
    xAxis: {
        name: '速度(km/h)',
        type: 'category',
        data: echartsX,
        axisTick: {
            show: false
        },
    },
    yAxis: {
        name: '车辆数(辆)',
        type: 'value'
    },
    series: [{
        data: data.cntInfo,
        type: 'line',
        smooth: true,
        emphasis: {
            itemStyle: {
                borderWidth: 6,
                shadowBlur: 10,
                shadowColor: '#ccc'
            }
        }
    }],
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
    }
})


const count = (infoData) => {
    for (let key in infoData) {
        if (infoData[key] <= 80) {
            data.cntInfo[0]++;
        } else if (infoData[key] >= 80 && infoData[key] < 90) {
            data.cntInfo[1]++;
        } else if (infoData[key] >= 90 && infoData[key] < 100) {
            data.cntInfo[2]++;
        } else if (infoData[key] >= 100 && infoData[key] < 110) {
            data.cntInfo[3]++;
        } else if (infoData[key] >= 110 && infoData[key] < 120) {
            data.cntInfo[4]++;
        } else if (infoData[key] >= 120 && infoData[key] < 130) {
            data.cntInfo[5]++;
        } else if (infoData[key] >= 130) {
            data.cntInfo[6]++;
        }
    }
}


const optionB = {
    tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: data.cntInfo[0], name: echartsX[0] },
        { value: data.cntInfo[1], name: echartsX[1] },
        { value: data.cntInfo[2], name: echartsX[2] },
        { value: data.cntInfo[3], name: echartsX[3] },
        { value: data.cntInfo[4], name: echartsX[4] }
      ]
    }
  ]
}
</script>

<style>
.chartZX {
    width: 800px;
    height: 400px;
    padding: 10px;
}

.chartB {
    width: 800px;
    height: 400px;
    padding: 10px;
}
</style>