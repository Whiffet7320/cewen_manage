<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">场站管理</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键词搜索：">
            <el-input size="small" v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">创建场站</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala" v-if="row.realname">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">姓名：{{row.realname.real_name}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">身份证号：{{row.realname.id_number}}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="18">
                      <div class="imgDiv">
                        <el-image
                          style="width:260px;height:150px;margin-right:8px;"
                          :src="row.realname.front_img"
                          :preview-src-list="row.myImg_paths"
                          fit="fill"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                        <el-image
                          style="width:260px;height:150px;margin-right:8px;"
                          :src="row.realname.back_img"
                          :preview-src-list="row.myImg_paths"
                          fit="fill"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="xiala" v-else>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">还未实名认证</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="stationName" title="场站名称"></vxe-table-column>
          <vxe-table-column field="imgUrl" title="图片">
            <template slot-scope="scope">
              <!-- :preview-src-list="[scope.row.avatar]" -->
              <el-image :src="scope.row.imgUrl" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="stationAddress" title="场站地点"></vxe-table-column>
          <vxe-table-column field="addressDetail" title="详细地址"></vxe-table-column>
          <!-- <vxe-table-column field="myStatus" width="120" title="状态(是否通过)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作状态" width="220">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="seeUser(scope.row)" type="text">查看用户</el-button>
                <el-button size="small" @click="see(scope.row)" type="text">查看设备</el-button>
                <el-button size="small" @click="tongguo(scope.row)" type="text">修改</el-button>
                <el-button size="small" @click="jujue(scope.row)" type="text">删除</el-button>
                <!-- <el-button size="small" @click="toEditShop(scope.row)" type="text">查看评论</el-button> -->
                <!-- <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jishiShougouPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 设备 -->
    <el-dialog
      title="设备"
      :visible.sync="seePinlunDialogVisible"
      width="1000px"
      :before-close="seePinlunHandleClose"
    >
      <div class="myForm">
        <el-form :inline="true" :model="searchPinlunForm" class="demo-form-inline">
          <el-form-item label="绑定设备：">
            <el-select size="small" filterable v-model="searchPinlunForm.region" placeholder="请选择设备">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.mechanicalName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="bangding">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table
          :tree-config="{
            children: 'comment_reply_list',
          }"
          :data="pinlunList"
        >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="mechanicalName" title="设备名称"></vxe-table-column>
          <vxe-table-column field="img" idth="100" title="图片">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.img]"
                :src="scope.row.img"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="pointCount" title="测温点数量"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="jiebang(scope.row)" type="text">解除绑定</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @current-change="this.handleCurrentChange1"
          :current-page="this.biaobaiqiangPinglunPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="this.pinlunCount"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 用户 -->
    <el-dialog
      title="用户"
      :visible.sync="userseePinlunDialogVisible"
      width="1000px"
      :before-close="userseePinlunHandleClose"
    >
      <div class="myForm">
        <el-form :inline="true" :model="usersearchPinlunForm" class="demo-form-inline">
          <el-form-item label="绑定用户：">
            <el-select size="small" filterable v-model="usersearchPinlunForm.region" placeholder="请选择用户">
              <el-option
                v-for="item in useroptions"
                :key="item.id"
                :label="`${item.nickName} ${item.phone}`"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="bangdinguser">绑定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table
          :tree-config="{
            children: 'comment_reply_list',
          }"
          :data="UserpinlunList"
        >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="nickName" title="用户名称"></vxe-table-column>
          <vxe-table-column field="faceUrl" idth="100" title="头像">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.faceUrl]"
                :src="scope.row.faceUrl"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column field="phone" title="电话号码"></vxe-table-column>
          <vxe-table-column field="standby1" title="备用1"></vxe-table-column>
          <vxe-table-column field="standby2" title="备用2"></vxe-table-column>
          <vxe-table-column field="standby3" title="备用3"></vxe-table-column>
          <vxe-table-column field="standby4" title="备用4"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="userJiebang(scope.row)" type="text">解除绑定</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @current-change="this.handleCurrentChange1"
          :current-page="this.biaobaiqiangPinglunPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="this.UserpinlunCount"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="场站名称">
                <el-input size="small" v-model="addForm.stationName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="图片">
                <div @click="companyList('tx')" class="myImg">
                  <el-image :src="addForm.imgUrl" fit="fill" style="width: 62px; height: 62px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址-省市区">
                <el-input size="small" v-model="addForm.stationAddress"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="地址详情">
                <el-input size="small" v-model="addForm.addressDetail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "jishiShougouPage",
      "jishiShougouPageSize",
      "biaobaiqiangPinglunPage",
      "biaobaiqiangPinglunPageSize"
    ])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    },
    jishiShougouPageSize: function(pageSize) {
      this.$store.commit("jishiShougouPageSize", pageSize);
      this.getData();
    },
    biaobaiqiangPinglunPage: function(page) {
      this.$store.commit("biaobaiqiangPinglunPage", page);
      this.getPinlunData();
      this.getUserPinlunData();
    },
    biaobaiqiangPinglunPageSize: function(pageSize) {
      this.$store.commit("biaobaiqiangPinglunPageSize", pageSize);
      this.getPinlunData();
      this.getUserPinlunData();
    }
  },
  data() {
    return {
      UserpinlunList:[],
      UserpinlunCount:0,
      useroptions:[],
      usersearchPinlunForm:{
        region: ""
      },
      userseePinlunDialogVisible:false,
      isAdd: null,
      file: null,
      imgFile: null,
      addForm: {
        imgUrl: "",
        stationName: "",
        stationAddress: "",
        addressDetail: ""
      },
      addDialogVisible: false,
      searchPinlunForm: {
        keyword: "",
        region: ""
      },
      seePinlunDialogVisible: false,
      pinlunCount: 0,
      pinlunId: "",
      pinlunList: [],
      //
      activeName: "1",
      formInline: {
        category_id: "",
        name: ""
      },
      options: [],
      tableData: [],
      total: 0
    };
  },
  created() {
    // this.file = new File(1,'cyy.png')
    this.$store.commit("biaobaiqiangPinglunPage", 1);
    this.$store.commit("jishiShougouPage", 1);
    this.getData();
    this.getshebeiData();
    this.getUserData();
  },
  methods: {
    async getData() {
      const res = await this.$api.mstationStationPage({
        pageSize: this.jishiShougouPageSize,
        pageNow: this.jishiShougouPage,
        sname: this.formInline.name
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      // this.tableData.forEach(ele => {
      //   if (ele.imgUrl) {
      //     this.$set(ele, 'myImg_paths', `${this.$url}${ele.imgUrl}`);
      //   }
      //   console.log(ele.myImg_paths)
      // });
    },
    async getshebeiData() {
      const res = await this.$api.mmGetMechanicalPage({
        pageSize: 10000,
        pageNow: 1
      });
      console.log(res.data.data);
      this.options = res.data.data;
    },
    async getUserData() {
      const res = await this.$api.muGetUsers({
        pageSize: 10000,
        pageNow: 1
      });
      console.log(res.data.data);
      this.useroptions = res.data.data;
    },
    async userJiebang(row) {
      const res = await this.$api.mDelstou({
        uid: row.id,
        sid: this.rowId
      });
      if (res.status == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$store.commit("biaobaiqiangPinglunPage", 1);
        this.getUserPinlunData();
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async jiebang(row) {
      const res = await this.$api.mDelmtos({
        mid: row.id,
        sid: this.rowId
      });
      if (res.status == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$store.commit("biaobaiqiangPinglunPage", 1);
        this.getPinlunData();
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    userseePinlunHandleClose(){
      this.userseePinlunDialogVisible = false;
    },
    async bangdinguser() {
      const res = await this.$api.mBindstou({
        uid: this.usersearchPinlunForm.region,
        sid: this.rowId
      });
      if (res.status == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$store.commit("biaobaiqiangPinglunPage", 1);
        this.getUserPinlunData();
        this.usersearchPinlunForm.region = "";
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async bangding() {
      const res = await this.$api.mBindmtos({
        mid: this.searchPinlunForm.region,
        sid: this.rowId
      });
      if (res.status == 0) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$store.commit("biaobaiqiangPinglunPage", 1);
        this.getPinlunData();
        this.searchPinlunForm.region = "";
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        // 添加
        this.imgFile.append("file", this.file);
        this.imgFile.append("addressDetail", this.addForm.addressDetail);
        this.imgFile.append("stationAddress", this.addForm.stationAddress);
        this.imgFile.append("stationName", this.addForm.stationName);
        const res = await this.$api.mCstation(this.imgFile);
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        }
      } else {
        if (!this.file) {
          this.file = null;
        }
        this.imgFile.append("file", this.file);
        this.imgFile.append("addressDetail", this.addForm.addressDetail);
        this.imgFile.append("stationAddress", this.addForm.stationAddress);
        this.imgFile.append("stationName", this.addForm.stationName);
        this.imgFile.append("sid", this.rowId);
        const res = await this.$api.mstationUpdateStation(this.imgFile);
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        }
      }
    },
    async see(row) {
      this.rowId = row.id;
      this.$store.commit("biaobaiqiangPinglunPage", 1);
      this.pinlunId = row.id;
      this.getPinlunData();
      this.seePinlunDialogVisible = true;
    },
    async seeUser(row){
      this.pinlunId = row.id;
      this.rowId = row.id;
      this.$store.commit("biaobaiqiangPinglunPage", 1);
      this.getUserPinlunData();
      this.userseePinlunDialogVisible = true;
    },
    tongguo(row) {
      this.isAdd = false;
      this.imgFile = new FormData();
      this.rowId = row.id;
      this.addForm.addressDetail = row.addressDetail;
      this.addForm.imgUrl = row.imgUrl;
      this.addForm.stationAddress = row.stationAddress;
      this.addForm.stationName = row.stationName;
      this.addDialogVisible = true;
    },
    async jujue(row) {
      const res = await this.$api.mstationDelStation({
        sid: row.id
      });
      console.log(res);
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    // 上传图片
    companyList(val, i = 0) {
      this.imgIndex = i;
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      this.file = event.target.files[0];
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(this.file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(this.file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(this.file);
      }
      console.log(url);
      this.$set(this.addForm, "imgUrl", url);
    },
    async getPinlunData() {
      const res = await this.$api.mmGetMechanicalList({
        sid: this.pinlunId,
        pageNow: this.biaobaiqiangPinglunPage,
        pageSize: this.biaobaiqiangPinglunPageSize
      });
      this.pinlunCount = res.data.total;
      this.pinlunList = res.data.data;
    },
    async getUserPinlunData() {
      const res = await this.$api.mstationUsers({
        sid: this.pinlunId,
        pageNow: this.biaobaiqiangPinglunPage,
        pageSize: this.biaobaiqiangPinglunPageSize
      });
      this.UserpinlunCount = res.data.total;
      this.UserpinlunList = res.data.data;
      console.log(this.UserpinlunList)
    },
    toSeeXiangqin(row) {
      this.$store.commit("biaobaiqiangPinglunPage", 1);
      this.pinlunId = row.id;
      this.getPinlunData();
      this.seePinlunDialogVisible = true;
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("biaobaiqiangPinglunPage", val);
    },
    searchPinlunOnSubmit() {},
    searchPinlunOnResult() {
      this.searchPinlunForm.keyword = "";
      this.getPinlunData();
    },
    seePinlunHandleClose() {
      this.seePinlunDialogVisible = false;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_status({
        status: row.myStatus == true ? "0" : "1",
        id: row.id,
        type: "jishi"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("shopObj", row);
      this.$router.push({ name: "Tianjiashangping" });
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteItems(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("tabIndex", (Number(tab.index) + 1).toString());
      this.formInline.category_id = "";
      this.formInline.name = "";
    },
    onSubmit() {
      console.log("submit!");
      this.getData();
    },
    toAddShop() {
      this.imgFile = new FormData();
      this.isAdd = true;
      this.addForm.addressDetail = "";
      this.addForm.imgUrl = "";
      this.addForm.stationAddress = "";
      this.addForm.stationName = "";
      this.addDialogVisible = true;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishiShougouPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.shopxx {
  display: flex;
  align-items: center;
  margin: 4px 0;
  .shopImg {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }
  .txt {
    font-size: 12px;
    line-height: 16px;
  }
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.displayN {
  display: none;
}
</style>