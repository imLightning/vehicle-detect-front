<template>
    <el-button type="info" plain @click="createSocket">{{ data.state ? '关闭' : '启动' }}</el-button>
    <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
</template>

<script setup>
import { reactive } from "vue";
// import { socket } from '@/utils/socket'
import { io } from "socket.io-client";

const data = reactive({
    state: false
})

const socket = io('http://localhost:5000', {
    autoConnect: false,   // 自动连接     
})

let items = reactive([])

const createSocket = () => {
    if (data.state) {
        console.log('关闭连接');
        socket.disconnect()
        data.state = false
        return
    }
    console.log('连接');
    socket.connect()
    data.state = true
}

socket.onmessage = (event) => {
    console.log('接收');
    console.log('WebSocket received:', event.data)
}

</script>