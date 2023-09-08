<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1 class="h1">Hello</h1>
          <h2 class="h2">欢迎来到xx平台</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginFrom.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//引入用户相关的小仓库
import { reactive, ref } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

let userStore = useUserStore();
//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);
let loginFrom = reactive({ username: "admin", password: "" });
const login = async () => {
  loading.value = true;

  try {
    await userStore.userLogin(loginFrom);
    //编程式跳转到首页
    $router.push("/");
    ElNotification({
      type: "success",
      message: "登录成功!",
    });
    loading.value = false;
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
    loading.value = false;
  }
};
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;
  }

  .h1 {
    color: white;
    font-size: 40px;
    font-style: initial;
  }

  .h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
