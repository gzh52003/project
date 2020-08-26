<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      method="post"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="ruleForm.gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="保密" value="保密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (value < 18) {
        // 如果输入的值不符合规则，则提示信息
        return callback(new Error("未满18禁止浏览"));
      } else {
        // 规则通过后的回掉
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        gender: "",
        age: "",
      },
      rules: {
        age: [
          { required: true, message: "年龄必填", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          // 自定义校验规则
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        password: [
          {
            min: 6,
            max: 12,
            message: "密码长度必须在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        console.log(13, valid);
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          const { ruleForm } = this;
          const { data } = await this.$request.post("reg", {
            ...ruleForm,
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "保存",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.el-form {
  margin: 20px auto 0;
  width: 500px;
}
</style>