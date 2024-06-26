<template>
    <div
        style="display: flex; align-items: center; margin-bottom: 10px;"
    >
        <el-button type="primary" plain @click="data.display = !data.display"
        >切换显示模式</el-button>
        <div style="margin-left: 10px; color: #98a1bb;">正在使用录像管理...</div>
    </div>
    <div v-if="data.display">
        <el-table :data="data.file" style="width: 100%">
            <el-table-column prop="id" label="序号" width="120" />
            <el-table-column prop="filename" label="录像"/>
            <el-table-column prop="state" label="状态" width="120" />
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column fixed="right" label="操作" min-width="120">
            <template v-slot="scope">
                <el-button link type="primary" size="small" @click="detect(scope.row.id, scope.row.filename)"
                    :disabled="scope.row.state == '已检测'"
                >检测</el-button>
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
                    :disabled="item.state != '未检测'"
                    style="position: absolute; z-index: 8;right: 0%;top: 50%;transform:translateY(-50%); right: 20px;"
                >{{item.state == '未检测'?'检测':item.state}}</el-button>
                <el-alert :title="'('+item.id+')'+item.filename" type="success" show-icon :closable="false" v-if="item.state=='已检测'"/>
                <el-alert :title="'('+item.id+')'+item.filename" type="warning" show-icon :closable="false" v-else-if="item.state=='检测中'"/>
                <el-alert :title="'('+item.id+')'+item.filename" type="info" show-icon :closable="false" v-else/>
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
import { getfile, detectFile, deleteFile,  } from '@/api/file'
import { reactive } from 'vue'
import { secondaryConfirm, successLoading } from '@/utils/popups'

const data = reactive({
    file: [],
    display: false,
    baseUrl: 'http://127.0.0.1:5000/record/download?id='
})

const load = () => {
    getfile().then(res => {
        data.file = res.data
    }).catch(() => {

    })
}

load()

const detect = (id, filename) => {
    detectFile({
        id,
        filename,
    }).then(() => {
        successLoading()
        setTimeout(() => {
            load()
        }, 1)
    }).catch(() => {

    })
}

const handle_del = (id, filename) => {
    secondaryConfirm().then(() => {
        deleteFile({
            id,
            filename
        }).then(() => {
            load()
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