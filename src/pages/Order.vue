<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="订单日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
    <el-table-column align="right" width="200">
        <template v-slot:header slot:scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id:1,
          date: '2020-08-20',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:2,
          date: '2020-08-23',
          name: '天王盖地虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id:3,
          date: '2020-08-24',
          name: '刘小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id:4,
          date: '2020-08-11',
          name: '大小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    methods: {
      formatter(row) {
        return row.address;
      },
      handleDelete(index, row){
        row.splice(index, 1);
      },
    }
  }
</script>