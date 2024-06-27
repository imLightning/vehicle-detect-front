<template>
    <div
        style="display: flex; align-items: center; margin-bottom: 10px;"
    >
        <el-button type="primary" plain @click="data.display = !data.display"
        >切换显示模式</el-button>
        <div style="margin-left: 10px; color: #98a1bb;">正在使用检测管理...</div>
    </div>
    <div v-if="data.display">
        <el-table :data="data.file" style="width: 100%">
            <el-table-column prop="id" label="序号" width="120" />
            <el-table-column prop="filename" label="录像"/>
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column fixed="right" label="操作" min-width="120">
            <template v-slot="scope">
                <el-button link type="primary" size="small" @click="showInfo(scope.row.info)"
                >详情</el-button>
                <el-button link type="danger" size="small" @click="handle_del(scope.row.id, scope.row.filename)"
                >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
    <div v-else class="video-content">
        <div
            v-for="(item, index) in data.file" :key="index"
            style="position: relative;"
        >
            <div
                class="video-box"
            >
                <videoPlay :src="data.baseUrl + item.id" width="400px" height="225px" />
            </div>
            <div class="v-tag">
                <el-button type="primary" size="small" @click="showInfo(item.info)"
                    style="position: absolute; z-index: 8;right: 0%;top: 50%;transform:translateY(-50%); right: 20px;"
                >详情</el-button>
                <el-alert :title="'('+item.id+')'+item.filename" type="info" effect="dark" :closable="false"/>
            </div>
        </div>
    </div>


    <el-dialog v-model="infoDialog" title="车辆信息数据" width="850" @close="closeDialog">
        <el-button-group>
            <el-button type="primary" @click="showZX" :disabled="data.show">查看折线图</el-button>
            <el-button type="primary" @click="showB" :disabled="!data.show">
            查看极坐标图
            </el-button>
        </el-button-group>
        <div v-if="data.show">
            <div class="chartZX" id="chartZX"></div>
        </div>
        <div v-else>
            <div class="chartB" id="chartB"></div>
            <div>
                总车次：{{ cnt }}辆
            </div>
            <div>
                超速车次：{{ data.speedingCount }}辆
            </div>
        </div>
        
    </el-dialog>

    
</template>

<script>
// require style
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
export default {
  components: {
    videoPlay
  }
}
</script>

<script setup>

//引入echarts
import * as echarts from 'echarts';
import { getRes, delRes } from '@/api/result'
import { ref, reactive } from 'vue'
import { secondaryConfirm, successLoading } from '@/utils/popups'
import { localCache } from '@/utils/cache'

const data = reactive({
    file: [],
    speedInfo: {},
    display: false,
    baseUrl: 'http://127.0.0.1:5000/res/download?id=',
    show: true,
    cntInfo: [],
    speed_limit: 130,
    speedingCount: 0,

})

const load = () => {
    getRes().then(res => {
        data.file = res.data
        data.show = true;
        data.speed_limit = localCache.get("SPEED_LIMIT")
    }).catch(() => {})

}

load()

const handle_del = (id, filename) => {
    secondaryConfirm().then(() => {
        delRes({
            id,
            filename
        }).then(() => {
            successLoading()
            setTimeout(() => {
                load()
            }, 1)
        }).catch(() => {})
    }).catch(() => {

    })
}

function closeDialog() {
    location.reload()
}

let speedingCount = 0
const overSpeedSum = (info) => {
    speedingCount = 0
    for (let key in info) {
        if (info[key] > data.speed_limit) {
            speedingCount++
        }
    }
    data.speedingCount = speedingCount
}

const cnt = ref(0)

let cntInfo = [0, 0, 0, 0, 0, 0, 0]

const infoDialog = ref(false)
const echartsX = ['<80', '80~90', '90~100', '100~110', '110~120', '120~130', '>130']

let infoChart
const showInfo = (info) => {
    if (typeof infoChart !== "undefined") {
        infoChart.dispose()
    }
    data.show = true;
    cnt.value = Object.keys(data.speedInfo).length
    data.speedInfo = JSON.parse(info)
    overSpeedSum(data.speedInfo)
    infoDialog.value = true;
    count(data.speedInfo)
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartZX"))
        infoChart.setOption(optionZX)
    }, 1)
}



const showZX = () => {
    if (typeof infoChart !== "undefined") {
        infoChart.dispose()
    }
    data.show = true;
    cnt.value = Object.keys(data.speedInfo).length
    infoDialog.value = true;
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartZX"))
        infoChart.setOption(optionZX)
    }, 1) 
}


const showB = () => {
    if (typeof infoChart !== "undefined") {
        infoChart.dispose()
    }
    data.show = false;
    cnt.value = Object.keys(data.speedInfo).length
    setTimeout(() => {
        let infoChart = echarts.init(document.getElementById("chartB"))
        infoChart.setOption(optionB)
        console.log(cntInfo);
    },1)
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
        data: cntInfo,
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
            cntInfo[0]++;
        } else if (infoData[key] >= 80 && infoData[key] < 90) {
            cntInfo[1]++;
        } else if (infoData[key] >= 90 && infoData[key] < 100) {
            cntInfo[2]++;
        } else if (infoData[key] >= 100 && infoData[key] < 110) {
            cntInfo[3]++;
        } else if (infoData[key] >= 110 && infoData[key] < 120) {
            cntInfo[4]++;
        } else if (infoData[key] >= 120 && infoData[key] < 130) {
            cntInfo[5]++;
        } else if (infoData[key] >= 130) {
            cntInfo[6]++;
        }
    }
}

const optionB = reactive({
  title: [
    {
      text: '极坐标图'
    }
  ],
  polar: {
    radius: [30, '80%']
  },
  angleAxis: {
    max: 20,
    startAngle: 75
  },
  radiusAxis: {
    type: 'category',
    data: echartsX
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: cntInfo,
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  }
});
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

.video-content{
    display: flex;
    flex-wrap: wrap;
    width: 105%;
    overflow-y: scroll;
}
.video-box{
    width: 400px;
    height: 225px;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.2);
    margin-top: 60px;
    margin-right: 60px;
    margin-bottom: 20px;
}

.v-tag{
    position: absolute;
    top: -0px;
    z-index: 7;
    width: 400px;
}
</style>