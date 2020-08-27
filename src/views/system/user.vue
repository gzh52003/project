/**
 * 系统管理 用户管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <!-- <el-form-item label="搜索：">
        <el-select size="small" v-model="formInline.isLock" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="N"></el-option>
          <el-option label="已锁定" value="Y"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="">
        <el-input size="small" v-model="formInline.id" placeholder="输入用户id"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-input size="small" v-model="formInline.userMobile" placeholder="输入手机号"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handEdit()">添加</el-button>
        <el-button size="small" type="primary" @click="handleunit()">部门设置</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @selection-change="selectChange" :data="userData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column align="center" sortable prop="id" label="用户id" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="mobile" label="手机号" width="120">
      </el-table-column>
      <!-- <el-table-column align="center" sortable prop="userSex" label="性别" min-width="50">
      </el-table-column> -->
      <el-table-column align="center" sortable prop="email" label="邮件" min-width="120">
      </el-table-column>
      <el-table-column align="center" sortable prop="created_time" label="创建时间" min-width="120">
    
      </el-table-column>
      <el-table-column align="center" sortable prop="mg_state" label="状态" min-width="100">
        <template slot-scope="scope">
          <el-switch type="scope.row.mg_state=='true'?nshow:fshow" active-color="#13ce66" inactive-color="#13ce66" @change="editType(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" sortable prop="role_name" label="用户角色" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="用户id" prop="id">
          <el-input size="small" :value="editForm.id" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="editForm.username" auto-complete="off" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role_name">
          <el-select size="small" v-model="editForm.role_name" placeholder="请选择" class="userRole">
            <el-option label="公司管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input size="small" v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input size="small" v-model="editForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户页面 -->
    <el-dialog :title="title" :visible.sync="editFormVis" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="用户id" prop="id">
          <el-input size="small" :value="editForm.id" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="editForm.username" auto-complete="off" placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
        <el-input size="small" v-model="editForm.password" placeholder="请输入用户密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input size="small" v-model="editForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input size="small" v-model="editForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submit('editForm')">添加</el-button>
      </div>
    </el-dialog>
    <!-- 数据权限 -->
    <el-dialog title="数据权限" :visible.sync="dataAccessshow" width="30%" @click='closeDialog("perm")'>
      <el-tree ref="tree" default-expand-all="" :data="UserDept" :props="defaultProps" :default-checked-keys="checkmenu" node-key="id" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
  
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
// 导入请求方法
import {getUser,editUser,addUser,deleteUsers,searchUsers} from '../../api/userMG'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '添加用户',
      editFormVisible: false, //控制编辑页面显示与隐藏
      editFormVis:false,
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑
      editForm: {
        id: '',
        username: '',
        password:'',
        role_name: '',
        mobile: '',
        email: '',
      },
      // 部门参数
      unitparm: {
        userIds: '',
        deptId: '',
        deptName: ''
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        password: [
          { required: true,min:6,max:12, message: '请输入6-12位密码', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        // roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        // userSex: [{ required: true, message: '请选择性别', trigger: 'blur' }]
      },
      
    
      // 请求数据参数
      formInline: {
        page: 1,
        limit: 10,
        id: '',
        username: '',
        password:'',
        role_name: '',
        mobile: '',
        email: '',
      },
      //用户数据
      userData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
       // 分页参数
       currentPage:1, //初始页
        pageSize:10,  //  每页的数据
        total:0,
    }
  },

  /**
   * 数据发生改变
   */
  watch: {},

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
			getUser({
      pagenum:1,
      pagesize: 100
    }).then(res =>{
      this.total=res.data.total
        let ListArray =[]
        let data = res.data.users
				for (let key in data) {
					data[key].id = key
					ListArray.push(data[key])
        }
        
				this.userData = ListArray
			})
		},
    //搜索事件
    search:function() {
      let id = this.formInline.id
      if(id != ''){
        searchUsers(id).then(res=>{
          this.products = [res.data]
          if(res.meta.status == 200){
            let data = this.products.filter(function (product){
              return Object.keys(product).some(function (key){
                return String(product[key]).toLowerCase().indexOf(id) > -1
              })
            })
            this.userData = data
            this.$message({
                  type: 'success',
                  message: '搜索用户成功！'
                })
          }else if(res.meta.status == 400){
            this.$message({
                  type: 'info',
                  message: '嘤嘤嘤 好像没有该用户喔 请重新搜索'
                })
          }
        })
      }
    },

    handEdit:function(index,row){
      this.editFormVis = true
      if(row == undefined && row == 'undefined'){
        this.title = '添加用户'
        this.editForm.id = ''
        this.editForm.password=''
        this.editForm.username = ''
        this.editForm.mobile = ''
        this.editForm.email = ''
      }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改用户信息'
        this.editForm.id = row.id
        this.editForm.username = row.username
        this.editForm.mobile = row.mobile
        this.editForm.email = row.email
        
      } 
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          editUser(this.editForm.id,this.editForm)
            .then(res => {
              this.editFormVisible = false
              
              if (res.meta.status==200) {
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
                // this.reload()
                getUser({
                  pagenum:1,
                  pagesize: 50,
                  }).then((res)=>{
                    this.userData = res.data.users
                })
                
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
              
            })
        
        } else {
          return false
        }
      })
    },
    // 添加用户
    submit(editData){

      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          addUser(this.editForm)
            .then(res => {
              this.editFormVis = false
              
                if (res.meta.status === 201) {
              this.$message({
                  type: 'success',
                  message: '用户添加成功！'
                })
                // this.reload()
                getUser({
                  pagenum:1,
                  pagesize: 100,
                  }).then((res)=>{
                    this.userData = res.data.users
                })
                
                
              } else if(res.meta.status === 400){
                  this.$message({
                  type: 'error',
                  message: '用户已存在'
                })
                }
              
            })
        
        } else {
          return false
        }
      })
    },

    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          deleteUsers(row.id)
            .then(res => {
              if (res.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '用户已删除!'
                })
                // 删除数据重新请求
                getUser({
                  pagenum:1,
                  pagesize: 100,
                  }).then((res)=>{
                    this.userData = res.data.users
                })
                // this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: '删除失败'
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },


    //数据格式化
    changeArr(data) {
      var pos = {}
      var tree = []
      var i = 0
      while (data.length != 0) {
        if (data[i].pId == 0) {
          tree.push({
            id: data[i].id,
            name: data[i].name,
            pId: data[i].pId,
            open: data[i].open,
            checked: data[i].checked,
            children: []
          })
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i].pId]
          if (posArr != undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }

            obj.children.push({
              id: data[i].id,
              name: data[i].name,
              pId: data[i].pId,
              open: data[i].open,
              checked: data[i].checked,
              children: []
            })
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      }
      return tree
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      return change
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        userId: this.saveroleId,
        deptIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.deptIds = JSON.stringify(moduleIds)
      }
      UserDeptSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.dataAccessshow = false
            this.getdata(this.formInline)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('权限保存失败，请稍后再试！')
        })
    },
    // 刷新缓存
    refreshCache(index, row) {
      userFlashCache(row.userName)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '刷新成功！'
            })
            this.getdata(this.formInline)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('刷新失败，请稍后再试！')
        })
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

