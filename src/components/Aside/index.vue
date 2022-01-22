<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
          <i class="el-icon-s-home"></i>
          <span slot="title">数据</span>
        </el-menu-item>
        <el-submenu index="30">
          <template slot="title">
            <i class="el-icon-upload"></i>
            <span>下载</span>
          </template>
          <el-menu-item :route="{ name: 'Xiazaiguanli' }" index="30-1">下载管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Tixianliebiao' }" index="20-2">提现列表</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="21">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span>监测点</span>
          </template>
          <el-menu-item :route="{ name: 'Jiancedianguanli' }" index="21-1">监测点管理</el-menu-item>
        </el-submenu>-->
        <el-submenu index="20">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>场站</span>
          </template>
          <el-menu-item :route="{ name: 'Changzhanguanli' }" index="20-1">场站管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Tixianliebiao' }" index="20-2">提现列表</el-menu-item> -->
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户</span>
          </template>
          <el-menu-item :route="{ name: 'Yonghuguanli' }" index="2-1">用户管理</el-menu-item>
          <el-menu-item :route="{ name: 'Guanliyuanguanli' }" index="2-8">管理员管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Shangpingpinglun' }" index="2-3"
            >商品评论</el-menu-item
          >-->
          <!-- <el-menu-item :route="{ name: 'Yunfeimoban' }" index="2-4">运费模板</el-menu-item> -->
        </el-submenu>
        <el-submenu index="99">
          <template slot="title">
            <i class="el-icon-s-promotion"></i>
            <span>设备</span>
          </template>
          <el-menu-item :route="{ name: 'Shebeiguanli' }" index="99-1">设备管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Shangpingpinglun' }" index="2-3"
            >商品评论</el-menu-item
          >-->
          <!-- <el-menu-item :route="{ name: 'Yunfeimoban' }" index="2-4">运费模板</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>订单</span>
          </template>
          <el-menu-item :route="{ name: 'Dingdanguanli' }" index="3-1">订单管理</el-menu-item>
          <el-menu-item :route="{ name: 'Tixianliebiao' }" index="3-2">提现列表</el-menu-item>
        </el-submenu>-->
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-ticket"></i>
            <span>营销</span>
          </template>
          <el-submenu index="4-1">
            <span slot="title">拼团管理</span>
            <el-menu-item :route="{ name: 'Pingtuanshangping' }" index="4-1-1">拼团商品</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanliebiao' }" index="4-1-2">拼团列表</el-menu-item>
            <el-menu-item :route="{ name: 'Jishouliebiao' }" index="4-1-3">寄售列表</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanjilu' }" index="4-1-4">拼团记录</el-menu-item>
          </el-submenu>
          <el-submenu index="4-2">
            <span slot="title">卖场活动</span>
            <el-menu-item :route="{ name: 'Maichanghuodong' }" index="4-2-1">活动列表</el-menu-item>
          </el-submenu>
        </el-submenu>-->
        <!-- <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-help"></i>
            <span>校园树洞</span>
          </template>
          <el-menu-item :route="{ name: 'Shudongliebiao' }" index="5-1">树洞列表</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span>校园一角</span>
          </template>
          <el-menu-item :route="{ name: 'Xiaoyuanfengjing' }" index="6-1">校园风景</el-menu-item>
          <el-menu-item :route="{ name: 'Bangbangbaoxiu' }" index="6-2">帮帮报修</el-menu-item>
        </el-submenu>-->
        <!-- <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>财务</span>
          </template>
          <el-submenu index="7-1">
            <span slot="title">财务操作</span>
            <el-menu-item :route="{ name: 'Tixianshenqing' }" index="7-1-1"
              >提现申请</el-menu-item
            >
          </el-submenu>
          <el-submenu index="7-2">
            <span slot="title">佣金记录</span>
            <el-menu-item :route="{ name: 'Yongjinjilu' }" index="7-2-1"
              >佣金记录</el-menu-item
            >
          </el-submenu>
        </el-submenu>-->
        <!-- <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-s-claim"></i>
            <span>失物招领</span>
          </template>
          <el-menu-item :route="{ name: 'Bangbangxunzhu' }" index="8-1">帮帮寻主</el-menu-item>
          <el-menu-item :route="{ name: 'Bangbangxunwu' }" index="8-2">帮帮寻物</el-menu-item>
        </el-submenu>
        <el-submenu index="11">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>校园拼单</span>
          </template>
          <el-menu-item :route="{ name: 'Bangbangpinche' }" index="11-1">帮帮拼车</el-menu-item>
          <el-menu-item :route="{ name: 'Bangbangpindan' }" index="11-2">帮帮拼单</el-menu-item>
        </el-submenu>
        <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>文章</span>
          </template>
          <el-menu-item :route="{ name: 'Wenzhangliebiao' }" index="9-1">文章列表</el-menu-item>
        </el-submenu>-->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>设置</span>
          </template>
          <!-- <el-menu-item :route="{ name: 'Xiaoxiguanli' }" index="8-1">消息管理</el-menu-item> -->
          <el-menu-item :route="{ name: 'Qitashezhi' }" index="8-2">其他设置</el-menu-item>
          <el-menu-item :route="{ name: 'Lunbotushezhi' }" index="8-3">说明/协议</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Lunbotuliebiao' }" index="8-4">轮播图列表</el-menu-item>
          <el-menu-item :route="{ name: 'Kaipinyeshezhi' }" index="8-5">开屏页设置</el-menu-item>
          <el-menu-item :route="{ name: 'Shujuzhongxin' }" index="8-6">数据中心</el-menu-item>-->
        </el-submenu>
        <!-- <el-submenu index="10">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>其他</span>
          </template>
          <el-menu-item :route="{ name: 'Jiangpingliebiao' }" index="10-5">奖品列表</el-menu-item>
          <el-menu-item :route="{ name: 'Zhongjiangliebiao' }" index="10-6">中奖列表</el-menu-item>
          <el-menu-item :route="{ name: 'Chengshiliebiao' }" index="10-2">城市列表</el-menu-item>
          <el-menu-item :route="{ name: 'Fankuiliebiao' }" index="10-1">反馈意见列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhi' }" index="10-3">固定位置列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhishangping' }" index="10-4">固定位置商品列表</el-menu-item>
        </el-submenu>-->
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/Shouye") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", "数据");
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Guanliyuanguanli") {
        this.menuActiveIndex = "2-8";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">管理员管理</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">订单管理</span>`
        );
      } else if (to.path == "/Dingdan/Tixianliebiao") {
        this.menuActiveIndex = "3-2";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Xiaoyuanshudong/Shudongliebiao") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `校园树洞 / <span style="color: #515a61;
        font-weight: 700;">树洞列表</span>`
        );
      } else if (to.path == "/Xiaoyuanyijiao/Xiaoyuanfengjing") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `校园一角 / <span style="color: #515a61;
        font-weight: 700;">校园风景</span>`
        );
      } else if (to.path == "/Xiaoyuanyijiao/Bangbangbaoxiu") {
        this.menuActiveIndex = "6-2";
        this.$store.commit(
          "headerTit",
          `校园一角 / <span style="color: #515a61;
        font-weight: 700;">帮帮报修</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shiwuzhaoling/Bangbangxunzhu") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `失物招领 / <span style="color: #515a61;
        font-weight: 700;">帮帮寻主</span>`
        );
      } else if (to.path == "/Shezhi/Qitashezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">其他设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">说明/协议</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Chengshiliebiao") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      } else if (to.path == "/Xiaoyuanpindan/Bangbangpinche") {
        this.menuActiveIndex = "11-1";
        this.$store.commit(
          "headerTit",
          `校园拼单 / <span style="color: #515a61;
        font-weight: 700;">帮帮拼车</span>`
        );
      } else if (to.path == "/Xiaoyuanpindan/Bangbangpindan") {
        this.menuActiveIndex = "11-2";
        this.$store.commit(
          "headerTit",
          `校园拼单 / <span style="color: #515a61;
        font-weight: 700;">帮帮拼单</span>`
        );
      } else if (to.path == "/Wenzhang/Tianjiawenzhang") {
        this.$store.commit(
          "headerTit",
          `文章 / 文章列表 / <span style="color: #515a61;
        font-weight: 700;">添加/修改文章</span>`
        );
      } else if (to.path == "/Qita/Fankuiliebiao") {
        this.menuActiveIndex = "10-1";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">反馈意见列表</span>`
        );
      } else if (to.path == "/Qita/Chengshiliebiao") {
        this.menuActiveIndex = "10-2";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhi") {
        this.menuActiveIndex = "10-3";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhishangping") {
        this.menuActiveIndex = "10-4";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置商品列表</span>`
        );
      } else if (to.path == "/Qita/Jiangpingliebiao") {
        this.menuActiveIndex = "10-5";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">奖品列表</span>`
        );
      } else if (to.path == "/Qita/Zhongjiangliebiao") {
        this.menuActiveIndex = "10-6";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">中奖列表</span>`
        );
      } else if (to.path == "/Changzhan/Changzhanguanli") {
        this.menuActiveIndex = "20-1";
        this.$store.commit(
          "headerTit",
          `场站 / <span style="color: #515a61;
        font-weight: 700;">场站管理</span>`
        );
      } else if (to.path == "/Shebei/Shebeiguanli") {
        this.menuActiveIndex = "99-1";
        this.$store.commit(
          "headerTit",
          `设备 / <span style="color: #515a61;
        font-weight: 700;">设备管理</span>`
        );
      } else if (to.path == "/Jiancedian/Jiancedianguanli") {
        this.menuActiveIndex = "21-1";
        this.$store.commit(
          "headerTit",
          `监测点 / <span style="color: #515a61;
        font-weight: 700;">监测点管理</span>`
        );
      } else if (to.path == "/Xiazai/Xiazaiguanli") {
        this.menuActiveIndex = "30-1";
        this.$store.commit(
          "headerTit",
          `下载 / <span style="color: #515a61;
        font-weight: 700;">下载管理</span>`
        );
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false
    };
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>