<template>
  <div class="login-box">
    <h2>后台管理系统</h2>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="checkUser">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginApi } from "../server/login";

export default {
  name: "Login",
  components: {},
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        checkUser: [{ validator: validateUser, trigger: "blur" }],
        checkPass: [
          { validator: validatePass, trigger: "blur" },
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
      loginApi(this.ruleForm).then((res) => {
        console.log("res", res);
        console.log(this.ruleForm);
        if (res.meta.status === 200) {
          console.log("登录成功");
          let token = res.data.token
          localStorage.setItem('token',token)//保存token
          if(this.$route.query.redirect){
            let redirect = this.$route.query
            this.$router.push(redirect)
          }else{this.$router.push({name:"Main"})}

        }else if(res.meta.status === 400){
          alert("用户名密码必填")
        }else if(res.meta.status === 401){
          alert("输入账号密码有误，请重新输入")
        }
      });
    },
  },
};
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e14, #243b55);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(212, 25, 230, 0.5);
  /* background: #cccccc; */
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.el-form-item__content {
  text-align: center !important;
  margin-left: 0 !important;
}
.el-form-item__label {
  text-align: left !important;
  color: #fff !important;
}
</style>
