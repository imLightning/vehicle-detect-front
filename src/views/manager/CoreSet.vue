<template>
    <div class="oper">
        <el-button type="success" plain :disabled="!data.saveState" @click="saveSetting">保存</el-button>
        <el-button type="danger" plain :disabled="!data.saveState" @click="cancel">取消</el-button>
        <el-button type="danger" round  @click="loginOut">退出登录</el-button>
    </div>
    <div class="box">
        <div class="set"
            v-for="(item, index) in data.setting" :key="index"
        >
            <div class="set-pre"></div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; width: 120%;">
                <div class="set-index">
                    {{ index }}
                </div>
                <div class="set-item" @click="changeSet(index)" v-if="data.inputState[index] == 0">
                    {{ item }}
                </div>
                <el-input v-model="data.tempSetting[index]" style="width: 60px;" :placeholder="item" class="set-input" size="small" v-else/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getSetting, updateSetting } from '@/api/setting'
import { localCache } from '@/utils/cache'
import { useRouter } from "vue-router";

const $router = useRouter();

const data = reactive({
    setting: {},
    inputState: {},
    saveState: 0,
    tempSetting: {}
})

const load = () => {
    data.saveState = 0
    getSetting().then(res => {
        data.setting = res.data
        data.tempSetting = {}
        for(let key of Object.keys(data.setting)) {
            data.inputState[key] = 0
        }
    })
}

load()

const changeSet = (i) => {
    data.inputState[i] = 1
    data.saveState = 1
}

const saveSetting = () => {
    console.log(data.tempSetting);
    updateSetting(data.tempSetting)
    load()
}

const cancel = () => {
    load()
}

const loginOut = () => {
    let tokenValue = Number(localCache.get("token"))
    if (tokenValue) {
        localCache.remove('token')
        $router.push({ path: "/login" }).then(() => {
            window.location.reload();
        });
        
    }
    
}



</script>

<style>
.box{
    padding: 20px 0 0 20px;
}

.set-pre{
    background-color: #ffd04b;
    border-radius: 50%;
    width: 10px;
    height: 10px;
}

.set{
    display: flex;
    flex-direction: row;
    width: 210px;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
}

.set-index{
    letter-spacing: 2px;
    margin-left: 10px;
}

.set-item{
    margin-left: 10px;
    color: #98a1bb;
    cursor: pointer;
}
    
.set-input{
    position: absolute;
    right: 0%;
    color: #ffd04b;
}

.el-input__inner{
    text-align: right;
    font-size: 1.3em;
}

</style>