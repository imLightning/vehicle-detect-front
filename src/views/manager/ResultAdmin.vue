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
</template>

<script setup>
import { getRes, delRes } from '@/api/result'
import { reactive } from 'vue'
import { secondaryConfirm } from '@/utils/popups'

const data = reactive({
    file: []
})

const load = () => {
    getRes().then(res => {
        data.file = res.data
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

const showInfo = (info) => {
    console.log(info);
}

</script>