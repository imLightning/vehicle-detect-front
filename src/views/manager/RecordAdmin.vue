<template>
    <div class="operator">
        <el-button type="primary" plain @click="openCamera">打开摄像头</el-button>
        <el-button type="primary" plain @click="closeCamera">关闭摄像头</el-button>
        <div style="margin-left: 12px; display: flex; align-items: center;">
            <el-button type="primary" plain @click="changeRecord">{{ signal.recorded ? '结束录制' : '开始录制' }}</el-button>
            <div v-if="signal.recorded" style="margin-left: 12px; color: red;">录制中...</div>
        </div>
        <a :href="data.downloadUrl" :download="data.downloadName" style="margin-left: 10px;" 
            v-if="data.downloadUrl"
        ><el-button type="primary" plain>下载视频</el-button></a>
        <el-button type="primary" plain style="margin-left: 10px;" @click="sendRecord">上传录像</el-button>
        <el-upload
            v-model:file-list="data.fileList"
            action="http://127.0.0.1:5000/upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            style="margin-left: 10px;"
        >
            <el-button type="primary" plain>上传视频</el-button>
        </el-upload>
    </div>
    <video ref="video"></video>
    <br />
</template>

<script setup>
import { reactive, ref } from "vue";
import { recordUpload } from '@/api/file.js'
import { successLoading } from '@/utils/popups'
import { ElMessage } from "element-plus";

let video = ref()

const data = reactive({
    mediaStreamTrack: {},
    videoStream: '',
    fakeRecordedBlobs: [],
    recordedBlob: {},
    img: '',
    downloadUrl: '',
    downloadName: '',
    fileList: [],
    carmera_sign: 0,
    notfirst: 0
})

const signal = reactive({
    recorded: false
})

const uploadSuccess = () => {
    successLoading()
}

const openCamera = () => {
    data.carmera_sign = 1
    console.log('打开摄像头');
    navigator.mediaDevices.getUserMedia({
        video: true,
    }).then((stream) => {
        console.log('成功');
        data.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
        data.videoStream = stream;
        video.value.srcObject = stream;
        video.value.play();
    }).catch(() => {
        console.log('失败');
    })
}

const closeCamera = () => {
    console.log('关闭摄像头');
    if (!video.value.srcObject) return
    video.value.srcObject.getTracks()[0].stop();
}

const startRecord = () => {
    if(data.notfirst == 1) {
        location.reload()
        return
    }
    let mediaRecorder;
    let options;
    data.fakeRecordedBlobs = []
    if (typeof MediaRecorder.isTypeSupported === 'function') {
        // 根据浏览器来设置编码参数
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            options = {
                mimeType: 'video/webm;codecs=h264',
            };
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
            options = {
                mimeType: 'video/webm;codecs=h264',
            };
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
            options = {
                mimeType: 'video/webm;codecs=vp8',
            };
        }
        if(data.carmera_sign == 0) {
            ElMessage.error('请先开启摄像头！')
            return
        }
        mediaRecorder = new MediaRecorder(data.videoStream, options);
    } else {
        // console.log('isTypeSupported is not supported, using default codecs for browser');
        console.log('当前不支持isTypeSupported，使用浏览器的默认编解码器');
        if(data.carmera_sign == 0) {
            ElMessage.error('请先开启摄像头！')
            return
        }
        mediaRecorder = new MediaRecorder(data.videoStream);
    }
    mediaRecorder.start();
    signal.recorded = true
    // 视频录制监听事件
    mediaRecorder.ondataavailable = e => {
        console.log(e);
        // 录制的视频数据有效
        if (e.data && e.data.size > 0) {
            data.fakeRecordedBlobs.push(e.data);
        }
    };
    // 停止录像后增加下载视频功能，将视频流转为mp4格式
    mediaRecorder.onstop = () => {
        const blob = new Blob(data.fakeRecordedBlobs, { type: 'video/mp4' });
        data.recordedBlob = blob
        data.fakeRecordedBlobs = [];
        // 将视频链接转换完可以用于在浏览器上预览的本地视频
        data.downloadUrl = window.URL.createObjectURL(blob);
        // 生成随机数字
        const rand = Math.floor((Math.random() * 1000000));
        // 生成视频名
        data.downloadName = `video${rand}.mp4`;
    };
}

const endRecord = () => {
    data.notfirst = 1
    signal.recorded = false
    if (!video.value.srcObject) return;
    const stream = video.value.srcObject;
    const tracks = stream.getTracks();
    // 关闭摄像头和音频
    tracks.forEach(track => {
        track.stop();
    });
}

const changeRecord = () => {
    if (!signal.recorded) {
        console.log('开始录制');
        startRecord()
    } else {
        console.log('结束录制');
        endRecord()
    }
}

const sendRecord = () => {
    console.log('发送');
    if(!data.recordedBlob) return ;
    if(typeof data.recordedBlob != Blob) {
        ElMessage.error('请先录制视频')
        return;
    }
    // 创建FormData对象
    let formData = new FormData();
    formData.append('record', data.recordedBlob, 'record.mp4');
    recordUpload(formData).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

</script>

<style>
.operator {
    margin-bottom: 10px;
    display: flex;
}

a:link {
    color: blue;
    text-decoration: none;
}

a:active {
    color: white;
}

a:visited {
    color: rgb(144, 147, 153);
    text-decoration: none;
}

a:hover {
    color: white;
    text-decoration: none;
}
</style>