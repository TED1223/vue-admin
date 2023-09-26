<template>
  <el-card class="box-card">
    <!--      头像顶部添加品牌按钮-->
    <el-button type="primary" size="default" icon="Plus" @click="addTradeMark"
      >添加品牌</el-button
    >
    <!-- 表格组件，用于展示已有的数据 -->
    <!--
      table
      ---border:是否有纵向的边框
      table-column
      ---lable：某一个列表
      ---width：设置这一列的宽度
      ---align：设置这一列对齐方式
     -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            width="250px"
            icon="Delete"
            @confirm="removeTradeNark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <!--
      pagination
      ---v-model:current-page：设置当前分页器页码
      ---v-model:page-size:设置每一也展示数据条数
      ---page-sizes：每页显示个数选择器的选项设置
      ---background:背景颜色
      ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
     -->
    <el-pagination
      @current-change="getHasTrademark"
      @size-change="sizeChange"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev,pager,next,jumper,->,sizes,total"
      :total="total"
    />
  </el-card>

  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-form
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder="请输入品牌"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
//引入组合式API函数
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  reqCreateTrademark,
  reqDeleteTrademark,
  reqHasTrademark,
  reqUpdateTrademark,
} from "@/api/product/trademark";
import { TradeMark, TradeMarkResponseData } from "@/api/product/trademark/type";
import { ElMessage, UploadProps } from "element-plus";
//当前页码
let pageNo = ref<number>(1);
//每一页展示的数据
let limit = ref<number>(3);
//总数
let total = ref<number>(0);
//存储已有品牌的数据
let trademarkArr = ref<any>([]);
//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);
//定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
//获取el-form组件实例
let formRef = ref();

//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pager = 1) => {
  //当前页码
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );

  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
//当下拉菜单发生变化的时候触发此方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark();
};
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTrademark();
});

//上传图片组件 -> 上传图片之前出发的钩子函数
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    debugger;
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必PNG|JPG|GIF",
    });
    return false;
  }
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate("logoUrl");
};

//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  //是当表单元素触发blur时候,会触发此方法
  //自定义校验规则
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称位数小于等于两位"));
  }
};

//品牌LOGO图片自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  //是当表单元素触发blur时候,会触发此方法
  //自定义校验规则
  if (value) {
    callBack();
  } else {
    callBack(new Error("LOGO图片务必上传"));
  }
};

//对话框底部取消按钮
const cancel = () => {
  dialogFormVisible.value = false;
};

//更新操作
const updateTrademark = (data: TradeMark) => {
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
  dialogFormVisible.value = true;
  //ES6语法合并对象
  Object.assign(trademarkParams, data);
};

//添加|修改已有品牌
const confirm = async () => {
  //在你发请求之前,要对于整个表单进行校验
  //调用这个方法进行全部表单相校验,如果校验全部通过，在执行后面的语法
  await formRef.value.validate();
  let result;
  if (trademarkParams.id) {
    result = await reqUpdateTrademark(trademarkParams);
  } else {
    result = await reqCreateTrademark(trademarkParams);
  }
  //添加|修改已有品牌
  if (result.code == 200) {
    //关闭对话框
    dialogFormVisible.value = false;
    //弹出提示框
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    //再次发送请求获取已有全部的品牌数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
    //关闭对话框
    dialogFormVisible.value = false;
  }
};

//添加按钮打开弹出框
const addTradeMark = () => {
  dialogFormVisible.value = true;
  //清空数据
  trademarkParams.logoUrl = "";
  trademarkParams.tmName = "";
  trademarkParams.id = 0;
  formRef.value?.clearValidate("tmName");
  formRef.value?.clearValidate("logoUrl");
};

//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};

//
const removeTradeNark = async (id: number) => {
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    //删除成功提示信息
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败",
    });
  }
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-border-color);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
