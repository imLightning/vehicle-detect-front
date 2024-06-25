<template>
    <div>
        <el-table :data="data.file" style="width: 100%">
            <el-table-column prop="id" label="序号" width="120" />
            <el-table-column prop="filename" label="录像"/>
            <el-table-column prop="state" label="状态" width="120" />
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column fixed="right" label="操作" min-width="120">
            <template #default>
                <el-button link type="primary" size="small">检测</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getfile } from '@/api/file'
import { reactive } from 'vue'

const data = reactive({
    file: []
})

const load = () => {
    getfile().then(res => {
        data.file = res.data
    })
}

load()
</script>