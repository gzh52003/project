/**
 * 订单管理 交易订单
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.order_id" placeholder="输入订单ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column label="订单ID" prop="order_id" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户ID" prop="user_id" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="order_number" label="订单编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="商品价格" width="140" prop="order_price" sortable show-overflow-tooltip></el-table-column>
      
      <el-table-column  prop="order_pay" label="支付方式" width="100" show-overflow-tooltip :filters="[{ text: '支付宝', value: '支付宝' }, { text: '微信', value: '微信' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.order_pay == '1' ? 'primary' : (scope.row.order_pay =='2'?'warning':'success')"
          disable-transitions>{{scope.row.order_pay == '1' ? '支付宝' :(scope.row.order_pay == '2'?'微信':'银行卡')}}</el-tag>
      </template>
      </el-table-column>

      <el-table-column label="支付状态" prop="pay_status"
      :filter-method="filterPay"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.pay_status == '1' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.pay_status == '1' ? '已付款' : '未付款'}}</el-tag>
      </template>

      </el-table-column>
      <el-table-column sortable prop="order_price" label="支付金额" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send" >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.pay_status == '1' ? 'primary' : 'success'"
            disable-transitions>{{scope.row.pay_status == '1' ? '已发货' : '未发货'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="order_fapiao_title" label="发票抬头" width="180" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column sortable prop="update_time" label="更新时间" width="180" show-overflow-tooltip> -->
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
    <!-- 编辑界面 预览 订单详情-->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="50%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" ref="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单编号">
              <el-input size="small" v-model="editForm.order_number" auto-complete="off" placeholder="请输入订单编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="订单ID">
              <el-input size="small" v-model="editForm.order_id" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-input size="small" v-model="editForm.order_pay" auto-complete="off"  disabled>
              </el-input>
            </el-form-item>
            <el-form-item label="支付状态">
              <el-input size="small" v-model="editForm.pay_status" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input size="small" v-model="editForm.order_price" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="支付金额">
              <el-input size="small" v-model="editForm.order_price" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="发货状态">
              <el-input size="small" v-model="editForm.is_send" auto-complete="off"  disabled></el-input>
            </el-form-item>
            <el-form-item label="发票抬头">
              <el-input size="small" v-model="editForm.order_fapiao_title" auto-complete="off"  disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[5, 10, 20, 40]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
				</el-pagination>
  </div>
</template>

<script>

import {getOrderList,searchOrder} from '../../api/userMG'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      // 分页参数
       currentPage:1, //初始页
        pageSize:10,  //  每页的数据
        total:0,
      title: '预览',

      editForm: {
        id: '',
        name: '',
        payType: 1,
        partner: '',
        subMchId: '',
        appid: '',
        notifyUrl: '',
        signType: '',
        partnerKey: '',
        sellerUserId: '',
        certPath: '',
        certPassword: '',
        rsaKey: '',
        token: localStorage.getItem('logintoken')
      },
      formInline: {
        page: 1,
        limit: 10,
        order_id:'',
        user_id:'',
        order_number:'',
        order_price:'',
        order_pay:'',
        pay_status:'',
        order_price:'',
        is_send:'',
        order_fapiao_title:''
      },
    
      userparm: [], //搜索权限
      listData: [], //用户数据
    
    }
  },

  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  async created() {
        this.vueTable()
    // this.getdata(this.formInline)
    
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    	// 初始页currentPage、初始每页数据数pagesize和数据data
		handleSizeChange: function (size) {
        this.pageSize = size;
				console.log(this.pageSize)
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
				console.log(this.currentPage)
    },
     // 获取用户列表
		vueTable() {
			getOrderList({
      pagenum:1,
      pagesize: 100
    }).then(res =>{
      this.total=res.data.total
        let ListArray =[]
        let data = res.data.goods
				for (let key in data) {
					data[key].id = key
					ListArray.push(data[key])
        }
        console.log(ListArray);
				this.listData = ListArray
			})
		},

    // 获取公司列表
    filterTag(value,row) {
        return row.order_pay === value
      },
      filterPay(value,row){
        return row.pay_status === value
      },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search:function () {
      // this.getdata(this.formInline)
      let id = this.formInline.order_id
      if(id != ''){
        searchOrder(id).then(res=>{
          // console.log(res);
          this.products = [res.data]
          if(res.meta.status == 200){
            let data = this.products.filter(function (product){
              return Object.keys(product).some(function (key){
                return String(product[key]).toLowerCase().indexOf(id) > -1
              })
            })
            this.listData = data
            this.$message({
                  type: 'success',
                  message: '搜索订单成功！'
                })
          }else if(res.meta.status == 400){
            this.$message({
                  type: 'info',
                  message: '嘤嘤嘤 好像没有该订单喔 请重新搜索'
                })
          }
        })
      }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.editForm = row
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          ConfigSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公司保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('支付配置信息保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
  
    // 关闭编辑、增加弹出框
    closeDialog(formName) {
      this.editFormVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>
