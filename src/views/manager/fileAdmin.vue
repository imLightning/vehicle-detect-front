<template>
    <div>
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
                <el-button link type="primary" size="small" @click="handle_del(scope.row.id, scope.row.filename)"
                >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getfile, detectFile, deleteFile } from '@/api/file'
import { reactive } from 'vue'
import { secondaryConfirm } from '@/utils/popups'

const data = reactive({
    file: []
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
        load()
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
</script>