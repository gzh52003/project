/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="searchForm" class="user-search" ref="searchForm">
      <el-form-item label="搜索：" prop="goods_id">
        <el-input type="text" size="small" v-model="searchForm.goods_id" placeholder="输入商品ID" auto-complete="off">></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEditForm()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column  prop="goods_id" label="商品id" >
      </el-table-column>
      <el-table-column  prop="goods_name" label="商品名称" width="300">
      </el-table-column>
      <el-table-column  prop="goods_number" label="商品数量" >
      </el-table-column>
      <el-table-column label="商品价格" prop="goods_price"
      sortable width="120"></el-table-column>
      <el-table-column label="商品状态" prop="goods_state">
        <template slot-scope="scope">
        <el-tag
          :type="scope.row.goods_state == '0' ? 'danger' : (scope.row.goods_state =='1'?'warning':'success')"
          disable-transitions>{{scope.row.goods_state == '0' ? '未通过' :(scope.row.goods_state == '1'?'审核中':'已审核')}}</el-tag>
      </template>
      </el-table-column>
      
      <el-table-column label="是否热销" prop="is_promote" >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.is_promote === false ? 'primary' : 'success'"
            disable-transitions>{{scope.row.is_promote === false ? '否' : '是'}}</el-tag>
        </template>
      </el-table-column>
    
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <Pagination  :total="total" :page.sync="page"  ></Pagination> -->
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="商品ID" prop="goods_id">
          <el-input size="small" v-model="editForm.goods_id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name">
          <el-input size="small" v-model="editForm.goods_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input size="small" v-model="editForm.goods_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input size="small" v-model="editForm.goods_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input size="small" v-model="editForm.goods_weight" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品分类"></el-form-item> -->
        <el-form-item label="商品分类">
            <div class="block">
              <el-cascader
              :change-on-select="true"
              :props="defaultParams"
              v-model="selectedOptions"
              :options="options"
              :clearable="true"
              @change="handleChange()"
              >
              </el-cascader>
            </div>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 添加商品 -->
    <el-dialog :title="title" :visible.sync="editFormVis" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="addForm" :rules="rules" ref="addForm">
        <!-- <el-form-item label="商品ID" prop="goods_id">
          <el-input size="small" v-model="editForm.goods_id" auto-complete="off" ></el-input>
        </el-form-item> -->
        <el-form-item label="商品名称" prop="goods_name">
          <el-input size="small" v-model="addForm.goods_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input size="small" v-model="addForm.goods_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input size="small" v-model="addForm.goods_price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input size="small" v-model="addForm.goods_weight" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品分类"></el-form-item> -->
        <el-form-item label="商品分类">
            <div class="block">
              <el-cascader
              :change-on-select="true"
              :props="defaultParams"
              v-model="selectedOptions"
              :options="options"
              :clearable="true"
              @change="handleChange()"
              >
              </el-cascader>
            </div>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submit('addForm')">添加</el-button>
      </div>
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
import { getGoods,editGoods,deleteGoods,getProductType,addGoods,searchGoods } from '../../api/userMG'

function getCascaderObj(val,opt) {
    return val.map(function (value, index, array) {
      for (var itm of opt) {
        // console.log(opt[0])
        if (itm.cat_id == value) { opt = itm.children; return itm; }
      }
      return null;
    });
  }
export default {
  data() {
    
    return {
      selectedOptions:[],
      options: [],
      defaultParams: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 分页参数
       currentPage:1, //初始页
        pageSize:10,  //  每页的数据
        total:0,
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      editFormVis:false,
      title: '添加商品',
      editForm: {
        goods_id: '',
        goods_name: '',
        goods_number: '',
        goods_price:'',
        goods_weight:'',
        goods_cat:''
      },
      addForm:{
        goods_id: '',
        goods_name: '',
        goods_number: '',
        goods_price:'',
        goods_weight:'',
        goods_cat:''
      },
      searchForm:{
        goods_id:'',
        goods_name: '',
        goods_number: '',
        goods_price:'',
        goods_weight:'',
        goods_cat:''
      },
      // rules表单验证
      rules: {
        goods_number: [
          { required: true, max:"1000", message: '请输入1000内的数字', trigger: 'blur' }
        ],
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }]
        },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
  
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
  created() {
    this.vueTable()
    
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
			getGoods({
      pagenum:1,
      pagesize: 924
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

    async handleChange(){
      this.value = getCascaderObj(this.selectedOptions,this.options);
      this.value.map(item=>{
        this.name = item.cat_name;
        this.id = item.cat_id
        console.log(this.name);
      })
    },


    // 搜索事件
    search: function (){
      let goods_id = this.searchForm.goods_id
      if(goods_id != ''){
        searchGoods(this.searchForm.goods_id).then(res=>{
          // this.listData = res.data
          this.products = [res.data]
          
          if(res.meta.status == 200){
            let data = this.products.filter(function (product){
            return Object.keys(product).some(function (key){
              return String(product[key]).toLowerCase().indexOf(goods_id) > -1
            })
          })
            this.listData = data
            this.$message({
                  type: 'success',
                  message: '搜索商品成功！'
                })
          }else if(res.meta.status == 400){
            this.$message({
                  type: 'info',
                  message: '嘤嘤嘤 好像没有该商品喔 请重新搜索'
                })
          }

        })
      }
    },

    // 添加商品
    handleEditForm:function(index,row){
      this.editFormVis = true
      if(row == undefined && row == 'undefined'){
        this.title = '添加商品'
        this.addForm.goods_id = ''
        this.addForm.goods_name =''
        this.addForm.goods_number =''
        this.addForm.goods_price =''
        this.addForm.goods_weight =''
        this.addForm.goods_cat =''
      }
      getProductType({
          type:[1,2,3]
          }).then(res=>{
            this.options = res.data
          })
          // console.log(this.editForm);
          // console.log(222);
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '编辑商品'
        this.editForm.goods_id = row.goods_id 
        this.editForm.goods_name = row.goods_name
        this.editForm.goods_number = row.goods_number
        this.editForm.goods_price = row.goods_price
        this.editForm.goods_weight = row.goods_weight
        this.editForm.goods_cat = this.name
      } 
      getProductType({
          type:[1,2,3]
          }).then(res=>{
            this.options = res.data
          })
          // console.log(this.editForm);
          // console.log(222);
    },

    // 添加商品
    submit(addData){
      this.addForm.goods_cat = this.name
      console.log(this.addForm);
      console.log(3333);
        this.$refs[addData].validate(valid => {
        if (valid) {
          addGoods(this.addForm).then(res=>{
            this.editFormVis = false
            
            if (res.meta.status === 201) {
              this.$message({
                  type: 'success',
                  message: '商品添加成功！'
                })
                // this.reload()
                // 添加完商品重新渲染数据
                getGoods({
                  pagenum:1,
                  pagesize: 900
                }).then((res)=>{
                  this.listData = res.data.goods
                })
              }else{
                this.$message({
                  type: 'info',
                  message: '添加失败'
                })
              } 
          })

        } else {
          return false
        }

      })
      console.log(this.editForm);
      console.log(333);
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.editForm.goods_cat = this.name
      this.$refs[editData].validate(valid => {
        if (valid) {
          editGoods(this.editForm.goods_id ,this.editForm)
            .then(res => {
              this.editFormVisible = false
              console.log(this.editFormVisible);
              if (res.meta.status == 200) {
                // this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '商品保存成功！'
                })
                getGoods({
                  pagenum:1,
                  pagesize: 900
                }).then((res)=>{
                  this.listData = res.data.goods
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '保存失败'
                })
              }
            })
          
        
          addGoods(this.editForm).then(res=>{
              if (res.meta.status === 201) {
              this.$message({
                  type: 'success',
                  message: '商品添加成功！'
                })
                // this.reload()
                getGoods({
                  pagenum:1,
                  pagesize: 20,
                  }).then((res)=>{
                    this.listData = res.data.goods
                })
              }else{
                this.$message({
                  type: 'info',
                  message: '添加失败'
                })
              } 
          })
        
        
        
        } else {
          return false
        }
        console.log(this.editForm);
      })
      
    },
    // 删除商品
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteGoods(row.goods_id)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '商品已删除!'
                })
                getGoods({
                  pagenum:1,
                  pagesize: 900
                }).then((res)=>{
                  this.listData = res.data.goods
                })
                // this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: '商品删除失败'
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('商品删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
   
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