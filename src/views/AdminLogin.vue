<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 登录表单 -->
            <el-form :model="form" :rules="rules" ref="formRef" size="large">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        :prefix-icon="User"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input  
                    v-model="form.password"
                    :prefix-icon="Lock" 
                    show-password
                />
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button 
                    class="button" 
                    type="primary" 
                    @click="adminLogin()"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
    import { User, Lock } from "@element-plus/icons-vue";
    import { ElMessage } from "element-plus";
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import { login, isLogin } from "@/api/login.js"
    import { localCache } from "@/utils/cache"

    const $router = useRouter();

    const form = reactive({
        username: "",
        password: "",
    });

    const formRef = ref(null);

    //表单校验
    const rules = reactive({
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    })

    const load = () => {
        let tokenValue = Number(localCache.get("token"))
        if (tokenValue) {
            isLogin(tokenValue).then((res) => {
                if (res.code === 200 && res.data.id === tokenValue) {
                    $router.push({ path: "/home" })
                    return ;
                }
            }).catch(() => {})
        }
    }

    const adminLogin = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                login(form).then((res) => {
                    if (res.code === 200) {
                        if (res.data !== null) {
                            localCache.set("token", res.data.id);
                            ElMessage({
                                message: "登陆成功",
                                type: "success"
                            });
                            $router.push({ path: "/home" });
                        } else {
                            ElMessage({
                                message: "登陆失败",
                                type: "error"
                            });
                            $router.push({ path: "/login" });
                        }
                    }
                })
            }
        })
        
    }

    load()
</script>

<style>
    .login-page {
        height: 100vh;
        background-color: #fff;
    
        .bg {
            background: /*url('@/static/pic/test.png') no-repeat 60% center / 240px auto,*/
                url('@/static/pic/background.jpg') no-repeat center / cover;
            border-radius: 0 20px 20px 0;
        }
    
        .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;
    
            .title {
                margin: 0 auto;
            }
    
            .button {
                width: 100%;
            }
    
            .flex {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }
        }
    }

</style>