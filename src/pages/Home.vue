<template>
  <div>
    <section class="box1">
      <div class="box">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple" style="display:flex;justify-content: center;">
              <img
                src="http://5b0988e595225.cdn.sohucs.com/images/20191106/8b5ab508ad454a29a00a2e44d863ee54.png"
                alt
                style="width:100%;height:500px"
              />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>上周销售量</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看详细</el-button>
                </div>
                <div class="text item">{{'销售量:'+203}}</div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>上周利润</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看详细</el-button>
                </div>
                <div class="text item">{{'总利润' + 56021312 }}</div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple"></div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style lang="scss">
.box1 {
  width: 100%;
  height: 100%;
  position: relative;
}
.box {
  width: 100%;
  position: absolute;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>