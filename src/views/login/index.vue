<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到xx平台</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginFrom.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" :prefix-icon="Lock" v-model="loginFrom.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {User,Lock} from '@element-plus/icons-vue'
import {reactive} from "vue";

let loginFrom = reactive({username: 'admin',password: '111111'})
</script>

<style scoped></style>
