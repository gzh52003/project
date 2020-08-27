/**
 * 系统管理  角色管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.id" placeholder="输入角色ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加角色</el-button>
        <el-button size="small" type="primary"  @click="roleAuth()">角色授权</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <!-- <el-table-column align="center" type="selection" width="60">
      </el-table-column> -->
      <el-table-column label=" " align="center"  width="60">
        <template slot-scope="scope">
          <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)" style="margin-left: 10px;">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column sortable align="center" prop="id" label="角色ID" width="300">
      </el-table-column>
      <el-table-column align="center" prop="roleName" label="角色名称" width="300">
      </el-table-column>
      <el-table-column align="center" prop="roleDesc" label="角色描述" width="300">
      </el-table-column>
      
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="Edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色详情 -->
    <el-dialog :title="title" :visible.sync="searchFmVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="searchFm" ref="searchFm" :rules="rules">
        <el-form-item label="角色ID" prop="roleId">
          <el-input size="small" v-model="searchFm.roleId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="rolename">
          <el-input size="small" v-model="searchFm.roleName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input size="small" v-model="searchFm.roleDesc" auto-complete="off" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
    <!--  添加角色-->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
      
        <el-form-item label="角色名称" prop="roleName">
          <el-input size="small" v-model="editForm.roleName" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input size="small" v-model="editForm.roleDesc" auto-complete="off" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">添加</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog :title="title" :visible.sync="editRoleVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="editRole" ref="editRole" :rules="rules">
        <el-form-item label="角色ID" prop="id">
          <el-input size="small" v-model="editRole.id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input size="small" v-model="editRole.roleName" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input size="small" v-model="editRole.roleDesc" auto-complete="off" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submit('editRole')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRoles,deleteRoles,addRoles,searchRoles,editRoles} from '../../api/userMG'
// import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      searchFmVisible:false,
      editRoleVisible:false,
      templateSelection:{},
      templateRadio:false,
      title: '添加角色',
      editForm: {
        id: '',
        roleDesc: '',
        roleName: '',
      },
      searchFm:{
        roleId:'',
        roleName:'',
        roleDesc:''
      },
      editRole:{
        id:'',
        roleName:'',
        roleDesc:''
      },
      // rules 表单验证
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        limit: 10,
        roleId:'',
        roleName:'',
        roleDesc:''
      },
    
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
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
    // 获取角色列表
    getRoles().then(res=>{
        this.listData = res.data
      
    })
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取角色列表
    getdata(parameter) {
      // 模拟数据
      let res = {
        code: 0,
        msg: null,
        count: 6,
        data: [
          {
            addUser: 'root',
            editUser: 'root',
            addTime: 1519182004000,
            editTime: 1520288426000,
            roleId: 1,
            systemNo: 'pmd',
            roleNo: 'Administrator',
            roleName: '超级管理员'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521111376000,
            editTime: 1520678191000,
            roleId: 2,
            systemNo: 'order',
            roleNo: 'admin',
            roleName: '公司管理员'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520678221000,
            editTime: 1520678221000,
            roleId: 95,
            systemNo: 'pm',
            roleNo: 'common',
            roleName: '普通用户'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526349853000,
            editTime: 1526349853000,
            roleId: 96,
            systemNo: '1',
            roleNo: '1',
            roleName: '1'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526349942000,
            editTime: 1526437443000,
            roleId: 97,
            systemNo: '2',
            roleNo: '2',
            roleName: '2'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526652148000,
            editTime: 1526652148000,
            roleId: 101,
            systemNo: 'test',
            roleNo: 'demo',
            roleName: '演示角色'
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // roleList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('获取角色列表失败，请稍后再试！')
      //   })
    },

    getTemplateRow(index,row){
      this.templateSelection = row
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件

    search:function(index,row) {
      
      let id = this.formInline.id
      console.log(222);
      this.searchFmVisible = true
      
      if(id != ''){
        searchRoles(id).then(res=>{
          this.products = [res.data]
          
          if(res.meta.status == 200){
            let data = this.products.filter(function (product){
              return Object.keys(product).some(function (key){
                return String(product[key]).toLowerCase().indexOf(id) > -1
              })
            })
            this.title = '角色详情'
            this.searchFm.roleId = res.data.roleId
            this.searchFm.roleName = res.data.roleName
            this.searchFm.roleDesc = res.data.roleDesc
            // this.listData = data
            this.$message({
                  type: 'success',
                  message: '搜索角色成功！'
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

    //显示添加界面 
    handleEdit: function(index, row) {
      this.editFormVisible = true
      console.log(333);
      if (row == undefined && row == 'undefined') {
        this.title = '添加角色'
        this.editForm.id = ''
        this.editForm.roleDesc = ''
        this.editForm.roleName = ''
      } 
    },
    // 显示编辑页面
    Edit: function(index,row){
      this.editRoleVisible = true
      console.log(222);
      if (row != undefined && row != 'undefined') {
        this.title = '修改角色信息'
        this.editRole.id = row.id
        this.editRole.roleNmae = row.roleName
        this.editRole.roleDesc = row.roleDesc
        console.log(this.editRole);
      } 
    },

    // 修改用户信息
    submit(data){
      this.$refs[data].validate(valid => {
        if (valid) {
          editRoles(this.editRole.id,this.editRole)
            .then(res => {
              this.editRoleVisible = false
              this.loading = false
              if (res.meta.status == 200) {
                // this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '角色修改成功！'
                })
                getRoles().then(res=>{
                  this.listData = res.data
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '角色修改失败'
                })
              }
            })
        } else {
          return false
        }
      })
    },

    // 添加加页面保存方法
    submitForm(editData) {
      console.log(editData);
      this.title="添加角色"
      this.$refs[editData].validate(valid => {
        if (valid) {
          
          addRoles(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.meta.status == 201) {
                // this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '角色保存成功！'
                })
                getRoles().then(res=>{
                  this.listData = res.data
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '添加角色失败'
                })
              }
            })
        } else {
          return false
        }
      })
    },
    // 删除角色
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteRoles(row.id)
            .then(res => {
              if (res.meta.status == 200) {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
                })
                // this.getdata(this.formInline)
                getRoles().then(res=>{
                  this.listData = res.data
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败'
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 数据权限
    menuAccess: function(index, row) {
      this.menuAccessshow = true
      this.saveroleId = row.roleId
      RoleRightTree(row.roleId)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '获取权限成功'
            })
            this.changemenu(res.data.data)
            this.RoleRight = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      this.checkmenu = change
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = []
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          }
          temptree[list[i].id] = trow
          items.push(trow)
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]['children'].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          })
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]['children'].push(temptree[items[j].id])
        } else {
          tree.push(temptree[items[j].id])
        }
      }
      temptree = null
      items = null
      return tree
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.moduleIds = JSON.stringify(moduleIds)
      }
      RoleRightSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.menuAccessshow = false
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
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
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

 