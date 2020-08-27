<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" status-icon class="demo-ruleForm">
      <el-form-item label="订单码" prop="order_number">
        <el-input v-model="form.order_number" :disabled="mode!=='add'"></el-input>
      </el-form-item>
      <el-form-item label="用户id" prop="user_id">
        <el-input v-model="form.user_id"></el-input>
      </el-form-item>
      <el-form-item label="支付状态" prop="pay_status">
        <el-input v-model.number="form.pay_status"></el-input>
      </el-form-item>
      <el-form-item label="是否发货" prop="is_send">
        <el-input v-model.number="form.is_send"></el-input>
      </el-form-item>
      <el-form-item label="[个人公司]" prop="order_fapiao_title" width="100">
        <el-input v-model.number="form.order_fapiao_title"></el-input>
      </el-form-item>
      <el-form-item label="订单编号" prop="order_id">
        <el-input v-model.number="form.order_id"></el-input>
      </el-form-item>
      <el-form-item label="订单支付" prop="order_pay">
        <el-input v-model.number="form.order_pay"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="onSubmit" >提交</el-button>
        <el-button  v-if="mode=='add'" @click="resetForm('form')">重置</el-button>
        <el-button  v-else @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    mode: String,
  },
  data() {
    return {
      activeArr: [],
      form: {
        order_number: "",
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_id: "",
        order_pay: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs["form"].validate(async (valid) => {
        console.log(13, valid);
        const { form, mode } = this;
        if (this.mode === "add") {
          const { data } = await this.$request.post("/order", { ...form });
          console.log("data1=", data);
          this.form = {
            order_number: "",
            user_id: "",
            pay_status: "",
            is_send: "",
            order_fapiao_title: "",
            order_id: "",
            order_pay: "",
          };
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "创建成功!",
            });
          }
        } else {
          const { id } = this;
          const { data } = await this.$request.put("/order/" + id, { ...form });
          this.$router.push({
            path: "/order/orderlist",
          });
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        }
      });
    },
    resetForm() {
      this.form = {
        order_number: "",
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_id: "",
        order_pay: "",
      };
    },
    back(){
        this.$router.push({path:'/order'})
    }
  },
  async created() {
    if (this.mode === "edit") {
      const { id } = this.$route.params;
      const { data } = await this.$request.get("/order/" + id);
      this.id = id;
      console.log(data);
      Object.assign(this.form, data.data);
    }
  },
};
</script>