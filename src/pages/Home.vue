<template>
  <div>
    <section class="box1">
      <div class="box">
        <el-row :gutter="20">
          <el-col :span="16" style="width:600px;margin-right:50px">
            <div class="grid-content bg-purple" style="width:600px">
              <ve-map :data="chartData" :settings="chartSettings"></ve-map>
            </div>
          </el-col>
          <el-col :span="8" style="width:550px">
            <div class="grid-content bg-purple">
              <ve-line :data="chartDate" style="width:500px"></ve-line>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <ve-histogram :data="chartDatc" :extend="chartExtend"></ve-histogram>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <ve-ring :data="chartDatd" :settings="chartSettings"></ve-ring>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      position: "china",
      dimension: "位置",
      metrics: ["用户", "销售量"],
      dataType: {
        销售量: "KMB",
      },
    };
    this.chartExtend = {
      series(v) {
        v.forEach((i) => {
          i.barWidth = 10;
        });
        return v;
      },
      tooltip(v) {
        v.trigger = "none";
        return v;
      },
    };
    this.chartSettings = {
      roseType: "radius",
    };
    return {
      chartData: {
        columns: ["位置", "利润", "用户", "销售量"],
        rows: [
          { 位置: "吉林", 利润: 123, 用户: 123, 销售量: 92134 },
          { 位置: "北京", 利润: 1223, 用户: 2123, 销售量: 29234 },
          { 位置: "上海", 利润: 2123, 用户: 1243, 销售量: 94234 },
          { 位置: "浙江", 利润: 4123, 用户: 5123, 销售量: 29234 },
          { 位置: "广东", 利润: 41215223, 用户: 51523, 销售量: 292346 },
          { 位置: "四川", 利润: 41213, 用户: 4503, 销售量: 49234 },
          { 位置: "重庆", 利润: 42351, 用户: 6541, 销售量: 23244 },
          { 位置: "福建", 利润: 6363, 用户: 4563, 销售量: 32154 },
        ],
      },
      chartDate: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
          { 日期: "1/7", 访问用户: 4503, 下单用户: 4123, 下单率: 0.76 },
        ],
      },
      chartDatc: {
        columns: ["日期", "成本", "利润"],
        rows: [
          { 日期: "1月1日", 成本: 15, 利润: 12 },
          { 日期: "1月2日", 成本: 12, 利润: 25 },
          { 日期: "1月3日", 成本: 21, 利润: 10 },
          { 日期: "1月4日", 成本: 41, 利润: 32 },
          { 日期: "1月5日", 成本: 31, 利润: 30 },
          { 日期: "1月6日", 成本: 71, 利润: 55 },
          { 日期: "1月7日", 成本: 81, 利润: 64 },
        ],
      },
      chartDatd: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 },
          { 日期: "1/7", 访问用户: 4503 },
        ],
      },
    };
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