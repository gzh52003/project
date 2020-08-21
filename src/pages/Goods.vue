<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="goodslist"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" ></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="市场价格" prop="market_price"
      sortable></el-table-column>
      <el-table-column label="商品颜色" prop="color"></el-table-column>
      <el-table-column label="参考价格" prop="price" sortable></el-table-column>
      <!-- <el-table-column prop="unit" label="商品单位" show-overflow-tooltip></el-table-column> -->
      <el-table-column label="操作">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot> -->
        <!-- <slot:row="item/"> -->
        <template v-slot:default="scope">
          <!-- {{JSON.stringify(scope.row)}} -->
          <!-- {{scope.column}} - {{scope.$index}} -->
          <el-button size="small" plain type="success" @click="goto(scope.row._id)">编辑</el-button>
          <el-button size="small" plain type="danger" @click="deleteUser(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import axios from "axios";
// axios.get("http://laoxie.com/");
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  methods: {
    async deleteUser(id) {
      this.$confirm("确认删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/user/" + id);
        if (data.code === 1) {
          this.goodslist = this.goodslist.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      // this.$router.push("/user/edit/"+id);
      // this.$router.push("/user/edit/"+id+'?a=10');
      this.$router.push({
        name:'userEdit',
        params:{id},
        query:{
          a:10,b:20
        }
      })
    },
  },
  // 一进来发起请求写在生命周期函数created
  async created() {
    console.log("List=", this);
    /* axios({
        url:'http://localhost:2003/api/user',
        method:'get',

      }) */
    const { data } = await this.$request.get("/goods");
    console.log(data);

    this.goodslist = data;
    // axios.post('http://localhost:2003/api/user',{
    //   // post请求数据
    // })
  },
};
</script>