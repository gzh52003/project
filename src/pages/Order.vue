<template>
  <div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="订单日期" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      <el-table-column prop="sta" label="订单状态" sortable width="180"></el-table-column>
      <el-table-column align="right" width="200">
        <template v-slot:header slot:scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="margin-right:5px"
            type="info"
            @click="orderEdit(scope.$index,scope.row)"
          >编 辑</el-button>
          <!-- 弹窗编辑 -->
          <el-dialog
            title="编辑订单信息"
            :visible.sync="dialogFormVisible"
            width="500px"
            top="200px"
            align="center"
          >
            <el-form :model="form" ref="form">
              <el-form-item label="姓 名" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地 址" :label-width="formLabelWidth">
                <el-input v-model="form.address" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="订单状态" :label-width="formLabelWidth">
                <el-select v-model="form.sta" placeholder="请选择订单状态">
                  <el-option label="完成" value="完成"></el-option>
                  <el-option label="未完成" value="未完成"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="setDo(scope.$index,scope.row)">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="orderDelete(scope.row._id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" style="center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 8]"
        :page-size="pagesize"
        layout="total, sizes,prev, pager, next"
        :total="tableData.length"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tableData: [{
      //   id:1,
      //   date: '2020-07-20',
      //   name: '张三',
      //   address: '广州市海珠区',
      //   sta:'完成'
      // }, {
      //   id:2,
      //   date: '2020-08-17',
      //   name: '李四',
      //   address: '广州市天河区天河城',
      //   sta:'未完成'
      // }, {
      //   id:3,
      //   date: '2020-08-27',
      //   name: '赵二',
      //   address: '上海市外滩66号',
      //   sta:'未完成'
      // }, {
      //   id:4,
      //   date: '2020-06-21',
      //   name: '钱一',
      //   address: '上海市普陀区金沙江路 1520 弄',
      //   sta:'完成'
      // }],
      tableData: [],
      currentId: "",
      search: "",
      currentPage: 1, //默认显示页面为1
      pagesize: 8, //    每页的数据条数
      dialogFormVisible: false, //弹出层默认为关闭
      //弹出层中的表单
      form: {
        address: "",
        sta: "",
        name: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    formatter(row) {
      return row.address;
    },
    // 删除
    async orderDelete(id) {
      this.$confirm("你确认要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data } = await this.$request.delete("/order/" + id);
        if (data.code === 1) {
          this.tableData = this.tableData.filter((item) => item._id !== id);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
    },
    orderEdit(index, row) {
      this.dialogFormVisible = true; //开启弹出层
      //对弹出层中的表单赋值
      // this.form.address = row.address;
      // this.form.sta = row.sta;
      // this.form.name = row.name;
      console.log(index);
      this.form = Object.assign({}, row);
    },
    setDo(index, row) {
      console.log(row);

      // const {form}=this
      // const{data}= this.$request.put("/order/"+this.form._id,{
      //   ...form
      // })
      // if(data){
      //   this.$message({
      //         type: "success",
      //         message: "修改成功",
      //       });
      // }
      this.$refs["form"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true，否则为false
        if (valid) {
          const { form } = this;
          console.log(this.form);
          const { data } = await this.$request.put("/order/" + this.form._id, {
            ...form,
          });

          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        } else {
          console.log("error do!!");
          return false;
        }
      });
      // if(this.form._id === row._id){
      //       row.address = this.form.address  ;
      //       row.sta = this.form.sta
      //       row.name = this.form.name ;
      //     }
      this.dialogFormVisible = false;
      this.$router.go(0);
    },
    //每页下拉显示数据
    handleSizeChange: function (size) {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    //点击第几页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
  },
  async created() {
    console.log("List=", this);
    //   axios({
    //       url:'http://localhost:2003/api/user',
    //       method:'get'
    //   })
    const { data } = await this.$request.get("/order");
    console.log(data);
    this.tableData = data.data;
  },
};
</script>