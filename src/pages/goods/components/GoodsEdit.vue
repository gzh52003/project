<template>
  <div>
    <!-- <h1>商品{{mode === 'add' ? '添加': '编辑'}}</h1> -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
      status-icon
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品颜色" prop="color">
        <el-input v-model="form.color"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model.number="form.market_price" autocomplete="off"></el-input>
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
    var checkAge = (rule, value, callback) => {
      if (value > 100000) {
        //   如果输入的值不符合规则，则提示信息
        return callback(new Error("商品价格不可能超过100000"));
      } else {
        //   规则通过后回调
        callback();
      }
    };
    return {
      id: null,
      form: {
        name: "",
        price: "",
        color: "",
        market_price: "",
      },
      rules: {
        price: [
          { required: true, message: "请输入数字", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
        market_price: [
          { required: true, message: "请输入数字", trigger: "change" },
          { type: "number", message: "只能输入数字", trigger: "change" },
          {
            validator: checkAge,
            trigger: "change",
          },
        ],
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
          const { data } = await this.$request.post("/goods", { ...form });
          this.form = {
            name: "",
            price: "",
            color: "",
            market_price: "",
          };
        } else {
          const { id } = this;
          const { data } = await this.$request.put("/goods/" + id, { ...form });
          this.$router.push({
            path: "/goods/goodlist",
          });
        }
      });
    },
    resetForm(){
      this.form={
        name: "",
        price: "",
        color: "",
        market_price: "",
      }
    },
    back(){
      this.$router.push({path:'/goods'})
    }
  },
  async created() {
    if (this.mode === "edit") {
      const { id } = this.$route.params;
      const { data } = await this.$request.get("/goods/" + id);
      this.id = id;
      console.log(data);
      Object.assign(this.form, data.data);
    }
  },
};
</script>