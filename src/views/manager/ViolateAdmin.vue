<template>
    <el-button type="primary" plain @click="data.delstate = !data.delstate">编辑</el-button>
    <div
    style="display: flex; flex-wrap: wrap;"
    >
    <div
    v-for="(item, index) in data.file" :key="index"
    style="
                margin: 20px 20px 0 0;
                position: relative;
                "
        >
            <el-button type="danger" :icon="Delete" circle 
                style="position: absolute; z-index:7; 
                    top: 5px; right: 2px;
                    
                "
                v-if="data.delstate"
                @click="delone(item.id, item.filename)"
            />
            <div
                style="position: absolute; z-index:7; font-size: 0.8em; color: #ffd04b;
                    bottom: 5px; right: 5px; font-weight: bold;
                    
                "
            >{{ item.time.substring(0, 22) }}</div>
            <el-image
                style="width: 200px; height: 200px; border-radius: 10px"
                :src="data.baseUrl + item.id"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="getSrcList(item.id)"
                :initial-index="0"
                fit="cover"
            />
        </div>
    </div>
</template>

<script setup>
import {
  Delete,
} from '@element-plus/icons-vue'
import { reactive } from 'vue';
import { getViolation, delViolation } from '@/api/violate'
import { secondaryConfirm, successLoading } from '@/utils/popups'

const data = reactive({
    file: [],
    baseUrl: 'http://127.0.0.1:5000/violation/download?id=',
    delstate: false
})

const load = () => {
    getViolation().then(res => {
        data.file = res.data
    }).catch(() =>{})
}

load()

const getSrcList = (id) => {
    let list = [
        data.baseUrl + id
    ]
    return list
}

const delone = (id, filename) => { 
    secondaryConfirm().then(() => {
        delViolation({id, filename}).then(() => {
            successLoading()
            setTimeout(() => {
                load()
            }, 1)
        }).catch(() => {})
    }).catch(() => {

    })
}
</script>