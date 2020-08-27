<template>
  <div id="login">
    <el-card class="box-card">
      <div style="text-align:center" slot="header" class="clearfix">
        <span>金峰管理系统</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px" status-icon class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-button style="margin:0 auto;display:block;" type="primary" @click="login">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      console.log("submit!");
      this.$refs["form"].validate(async (valid) => {
        const { form } = this;
        const { data } = await this.$request.get(
          "/login?password=" + form.password + "&username=" + form.username
        );
        
        /* this.$refs["form"].validata(async (valid)=>{
          const {form}=this;
          const {data}=await this.$request.get("/login?password="+form.password+"&username="+form.username)
        }) */
        // console.log(aaa)
        console.log("data=", data);
        if (data.code === 1) {
          // 登录成功
          localStorage.setItem("currentUser", JSON.stringify(data.data));
          this.$router.push({ path: "/home" });
        }
      });
    },
    /* md5(data, privateKey = "laoxie") {
          const hash = crypto.createHash("md5");
          hash.update(data + privateKey); // 加盐 盐值
          const result = hash.digest("hex");

          return result;
        } */
  },
};
</script>
<style lang="scss">
#login {
  height: 100%;
  background: url(./../img/bbb.jpg);
  background-size: 100% 100%;
  overflow: hidden;
  .el-card {
    background: #fff;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .el-form-item__label {
      padding: 0 36px 0 0;
    }
  }
}
</style>