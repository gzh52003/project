<template>
  <div style="height:100%">
    <el-container style="height:100%" v-if="activeArr.length&&activeArr[0].path!=='/login'">
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="activeIndex"
          mode="vertical"
          background-color="#125b70"
          text-color="#fff"
          active-text-color="#999999"
          @select="changeMenu"
          :default-openeds="openMenu"
          router
        >
          <div class="box">
            <img src="./img/pic.png" alt />
          </div>

          <template v-for="item in menu">
            <el-submenu :key="item.path" :index="item.path" v-if="item.submenu">
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff" ref="text"></i>
                {{item.text}}
              </template>
              <el-menu-item
                :key="sub.path"
                :index="item.path+sub.path"
                v-for="sub in item.submenu "
              >{{sub.text}}</el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.path" :key="item.path" v-else ref="text">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <!-- <el-submenu :key="item.path" :index="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>
              <el-menu-item
                :key="sub.path"
                :index="item.path+sub.path"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>-->
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-row>
            <el-col :span="12" class="logo">
              <i class="el-icon-connection"></i>金锋后台管理系统
            </el-col>
            <el-col :span="12" style="text-align:right">
              <span>{{userInfo.username}}</span>
              <el-button type="text" size="small" @click="quit">退出</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <div v-if="activeArr.length">
              <el-breadcrumb-item
                v-for="(a,i) in activeArr"
                :key="i"
                :to="{ path: a.path }"
              >{{a.title}}</el-breadcrumb-item>
            </div>
          </el-breadcrumb>
          <div style="padding:15px 0;">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/home",
      activeArr: [],
      openMenu: ["/user", "/goods", "/order"],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "添加用户",
              path: "/useradd",
            },
            {
              text: "用户列表",
              path: "/userlist",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-s-cooperation",
          submenu: [
            {
              text: "添加商品",
              path: "/goodadd",
            },
            {
              text: "商品列表",
              path: "/goodlist",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "添加订单",
              path: "/orderadd",
            },
            {
              text: "订单列表",
              path: "/orderlist",
            },
          ],
        },
      ],
      userInfo: {},
      currentIndex: 0,
    };
  },
  methods: {
    goto(path, idx) {
      console.log(this.$router);
      this.$router.push(path);
      // this.$router.replace(path);
      this.currentIndex = idx;
    },
    back() {
      this.$router.back();
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
    getRoute() {
      if (!this.$route.matched.length) return;
      let activeArr = this.$route.matched.map(({ path, meta }) => {
        let res = { path, title: meta.title };
        return res;
      });
      console.log(activeArr);
      this.activeArr = activeArr;
    },
    quit() {
      localStorage.removeItem("currentUser");
      this.$router.push({ path: "/login" });
    },
    getUserInfo() {
      this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
    },
  },
  created() {
    console.log(this.$route);
    console.log(this.$router);
    this.getRoute();
    this.getUserInfo();
    console.log("this.userInfo=", this.userInfo);
  },
  watch: {
    $route(to, from) {
      console.log(this.$route);
      this.getRoute();
      if(from.path === '/login') {
        this.getUserInfo();
      } 
    },
  },

  components: {},
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.box {
  text-align: center;
  margin: 30px 0;
}
img {
  width: 80px;
  height: 50px;
}
.header {
  line-height: 60px;
  color: #fff;
  background-color: #e1e9ff;
  .logo {
    font-size: 24px;
    color: #125b70;
    i {
      font-size: 40px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
</style>
