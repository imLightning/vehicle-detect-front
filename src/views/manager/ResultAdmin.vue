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
                <el-button link type="primary" size="small" @click="detect(scope.row.info)"
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
                <el-button type="primary" size="small" @click="detect(item.id, item.filename)"
                    style="position: absolute; z-index: 8;right: 0%;top: 50%;transform:translateY(-50%); right: 20px;"
                >详情</el-button>
                <el-alert :title="'('+item.id+')'+item.filename" type="info" effect="dark" :closable="false"/>
            </div>
        </div>
    </div>
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
import { getRes, delRes  } from '@/api/result'
import { reactive } from 'vue'
import { secondaryConfirm, successLoading } from '@/utils/popups'

const data = reactive({
    file: [],
    display: false,
    baseUrl: 'http://127.0.0.1:5000/res/download?id='
})

const load = () => {
    getRes().then(res => {
        data.file = res.data
    }).catch(() => {

    })
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

// const playRecord = () => {
//     // downloadRecord({
//     //     id
//     // }).then(() => {
//     //     window.open('http://127.0.0.1:5000/record/download?id=' + id)
//     // }).catch(() =>{})
// }
</script>

<style>
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