<template>
    <el-menu mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b"
        router="true"
        >
        <el-menu-item index="home">首页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>工作台</template>
            <el-menu-item index="record">视频录制</el-menu-item>
            <!-- <el-menu-item index="detect">实时检测</el-menu-item> -->
            <el-menu-item index="file">录像管理</el-menu-item>
            <el-menu-item index="result">检测管理</el-menu-item>
            <el-menu-item index="violate">超速抓拍</el-menu-item>

        </el-sub-menu>
        <el-menu-item index="3" disabled>其他</el-menu-item>
        <el-menu-item index="set">设置</el-menu-item>
        <el-menu-item index="thank">致谢</el-menu-item>
    </el-menu>
    <div class="R">
        <router-view />
    </div>
</template>

<script setup>

</script>

<style>
    .R{
        padding: 10px;
    }
</style>