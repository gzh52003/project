<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="orderlist"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="400"
      stripe
      border
      highlight-current-row
    >
      <el-table-column label="订单码" prop="order_number" sortable fixed="left" width="150px"></el-table-column>
      <el-table-column label="用户ID" prop="user_id" sortable  width="120" align="center"></el-table-column>
      <el-table-column label="支付状态" prop="pay_status" sortable width="120" align="center"></el-table-column>
      <el-table-column label="是否发货" prop="is_send" sortable width="120" align="center"></el-table-column>
      <el-table-column label="[个人&公司]" prop="order_fapiao_title" sortable  align="center"></el-table-column>
      <el-table-column label="订单编号" prop="order_id" sortable width="120" align="center"></el-table-column>
      <el-table-column label="订单支付" prop="order_pay" sortable width="120" align="center"></el-table-column>
      <!-- <el-table-column prop="unit" label="商品单位" show-overflow-tooltip></el-table-column> -->
      <el-table-column label="操作" fixed="right" width="125px">
        <!-- 需要获取数据id -->
        <!-- <slot name="title"></slot> -->
        <!-- <slot:row="item/"> -->
        <template v-slot:default="scope">
          <!-- {{JSON.stringify(scope.row)}} -->
          <!-- {{scope.column}} - {{scope.$index}} -->
          <el-button size="small" plain type="primary" icon="el-icon-edit"  @click="goto(scope.row._id)"></el-button>
          <el-button size="small" plain type="primary" icon="el-icon-delete" @click="deleteOrder(scope.row._id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderlist: [],
    };
  },
  methods: {
    async deleteOrder(id) {
      this.$confirm("确认删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/order/" + id);
        if (data.code === 1) {
          this.orderlist = this.orderlist.filter((item) => item._id !== id);
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
        }
      });
    },
    goto(id) {
      // 跳转路由传参
      // this.$router.push("/user/edit/"+id);
      // this.$router.push("/user/edit/"+id+'?a=10');
      this.$router.push({
        name: "orderEdit",
        params: { id },
        query: {
          a: 10,
          b: 20,
        },
      });
    },
  },

  async created() {
    console.log("List=", this);
    const { data } = await this.$request.get("/order");
    console.log("data=", data);
    this.orderlist = data.data;
  },
};
</script>