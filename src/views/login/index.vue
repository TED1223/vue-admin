<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginFrom"
          :rules="rules"
          ref="loginForms"
        >
          <h1 class="h1">Hello</h1>
          <h2 class="h2">欢迎来到xx平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
import { useRouter, useRoute } from "vue-router";
//引入获取当前时间的函数
import { getTime } from "@/utils/time";

let userStore = useUserStore();
//获取路由器
let $router = useRouter();
let $route = useRoute();
//定义变量控制按钮加载效果
let loading = ref(false);
let loginFrom = reactive({ username: "shangguigu", password: "111111" });
let loginForms = ref();
const login = async () => {
  //保证全部表单校验通过
  await loginForms.value.validate();
  loading.value = true;

  try {
    await userStore.userLogin(loginFrom);
    //判断登录的时候是否有query参数，如果有就往query参数跳转，如果没有就跳转到首页
    let redirect: any = $route.query.redirect;
    //编程式跳转到首页
    $router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      message: "登录成功!",
      title: `Hi ${getTime()}好`,
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

const validatorUsername = (rule: any, value: any, callback: any) => {
  //rule：即为数组校验规则对象
  //value表单信息
  //callback 返回函数
  if (value.length >= 3) {
    callback();
  } else {
    callback(new Error("账号长度至少3位"));
  }
};

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少六位"));
  }
};

//定义表单校验的规则
const rules = {
  username: [
    { validator: validatorUsername, trigger: "change" },
    // {required: true, min: 5,message: "用户名长度不能小于6", trigger: "change"},
    // {required: true, max: 20,message: "用户名长度不能大于20", trigger: "change"},
  ],
  password: [{ validator: validatorPassword, trigger: "change" }],
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
