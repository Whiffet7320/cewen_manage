<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">下载管理</div>
      <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="时间段" name="1"></el-tab-pane>
          <el-tab-pane label="定时" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-form-item label="设备：">
              <el-cascader v-model="formInline.sbId" size="small" :props="xzSbprops"></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
              <el-button size="small" @click="onRect">重置</el-button>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item v-if="activeName == '1'" label="时间：">
              <el-date-picker
                size="small"
                v-model="formInline.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item v-if="activeName == '2'" label="时间：">
              <el-time-picker
                size="small"
                v-model="formInline.time2"
                start="00:00"
                end="23:59"
                step="00:01"
                format="HH:mm"
                value-format="HH:mm"
              ></el-time-picker>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input size="small" v-model="formInline.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="shenqing">申请</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <!-- <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">创建用户</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala" v-if='row.realname'>
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
          <vxe-table-column field="mname" title="设备名"></vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column field="states" title="状态"></vxe-table-column>
          <vxe-table-column v-if="activeName == '2'" field="cycle" title="周期"></vxe-table-column>
          <vxe-table-column v-if="activeName == '2'" field="time" title="时间点"></vxe-table-column>
          <vxe-table-column v-if="activeName == '1'" field="startTime" title="开始时间"></vxe-table-column>
          <vxe-table-column v-if="activeName == '1'" field="endTime" title="结束时间"></vxe-table-column>
          <!-- <vxe-table-column field="myStatus" width="120" title="状态(是否通过)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>-->
          <vxe-table-column title="操作" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="small"
                  v-if="activeName == '1'"
                  @click="tongguo(scope.row)"
                  type="text"
                >下载</el-button>
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
    <!-- 查看评论 -->
    <el-dialog
      title="查看评论"
      :visible.sync="seePinlunDialogVisible"
      width="1000px"
      :before-close="seePinlunHandleClose"
    >
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchPinlunForm" class="demo-form-inline">
          <el-form-item show-overflow="title" size="small" label="关键词搜索：">
            <el-input v-model="searchPinlunForm.keyword" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchPinlunOnSubmit">查询</el-button>
            <el-button size="small" @click="searchPinlunOnResult">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="myTable">
        <vxe-table
          :tree-config="{
            children: 'comment_reply_list',
          }"
          :data="pinlunList"
        >
          <vxe-table-column field="id" width="80" title="ID"></vxe-table-column>
          <vxe-table-column tree-node field="myNickname" title="评论者"></vxe-table-column>
          <vxe-table-column field="avatar_url" idth="100" title="头像">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[scope.row.avatar_url]"
                :src="scope.row.avatar_url"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="content" min-width="200" title="评论内容"></vxe-table-column>
          <vxe-table-column field="zan_count" width="80" title="获赞"></vxe-table-column>
          <vxe-table-column field="add_time" title="评论时间"></vxe-table-column>
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
              <el-form-item label="用户名">
                <el-input size="small" v-model="addForm.nickName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="isAdd" :span="20">
              <el-form-item label="密码">
                <el-input size="small" v-model="addForm.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isAdd">
            <el-col :span="20">
              <el-form-item label="用户头像">
                <div @click="companyList('tx')" class="myImg">
                  <el-image :src="addForm.imgUrl" fit="fill" style="width: 62px; height: 62px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('tx')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="手机号">
                <el-input size="small" v-model="addForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="邮箱">
                <el-input size="small" v-model="addForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="!isAdd" :span="20">
              <el-form-item label="备用1">
                <el-input size="small" v-model="addForm.standby1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="!isAdd" :span="20">
              <el-form-item label="备用2">
                <el-input size="small" v-model="addForm.standby2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="!isAdd" :span="20">
              <el-form-item label="备用3">
                <el-input size="small" v-model="addForm.standby3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="!isAdd" :span="20">
              <el-form-item label="备用4">
                <el-input size="small" v-model="addForm.standby4"></el-input>
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
import vm from "../../main";
console.log(vm);
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
    },
    biaobaiqiangPinglunPageSize: function(pageSize) {
      this.$store.commit("biaobaiqiangPinglunPageSize", pageSize);
      this.getPinlunData();
    }
  },
  data() {
    return {
      isAdd: null,
      file: null,
      imgFile: null,
      addForm: {
        imgUrl: "",
        nickName: "",
        password: "",
        phone: "",
        email: "",
        standby1: "",
        standby2: "",
        standby3: "",
        standby4: ""
      },
      addDialogVisible: false,
      searchPinlunForm: {
        keyword: ""
      },
      seePinlunDialogVisible: false,
      pinlunCount: 0,
      pinlunId: "",
      pinlunList: [],
      jcdoptions: [],
      //
      activeName: "1",
      formInline: {
        email: "",
        sbId: "",
        time: [],
        time2: ""
      },
      options: [],
      tableData: [],
      total: 0,
      xzSbprops: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node;
          console.log(node);
          if (level == 0) {
            const res = await vm.$api.mstationStationPage({
              pageSize: 100000,
              pageNow: 1
            });
            res.data.data = JSON.parse(
              JSON.stringify(res.data.data).replace(/stationName/g, "label")
            );
            res.data.data = JSON.parse(
              JSON.stringify(res.data.data).replace(/id/g, "value")
            );
            resolve(res.data.data);
          } else if (level == 1) {
            const res = await vm.$api.mmGetMechanicalList({
              sid: node.value,
              pageNow: 1,
              pageSize: 110000
            });
            if (res.data.total == 0) {
              vm.$message({
                message: "该场站下暂无设备,请重新选择",
                type: "warning"
              });
              resolve([]);
            }
            res.data.data = JSON.parse(
              JSON.stringify(res.data.data).replace(/mechanicalName/g, "label")
            );
            res.data.data = JSON.parse(
              JSON.stringify(res.data.data).replace(/id/g, "value")
            );
            res.data.data.forEach(ele => {
              ele.leaf = true;
            });
            resolve(res.data.data);
          }

          // setTimeout(() => {
          //   resolve(1);
          // }, 1000);
        }
      }
    };
  },
  created() {
    this.$store.commit("biaobaiqiangPinglunPage", 1);
    this.$store.commit("jishiShougouPage", 1);
    this.getData();
    this.getData2();
  },
  methods: {
    async shenqing() {
      if (this.activeName == "1") {
        const res = await this.$api.mpointDownloadHistory({
          endDate: this.formInline.time[1],
          startDate: this.formInline.time[0],
          mid: this.formInline.sbId[1],
          email: this.formInline.email
        });
        if (res.status == 0) {
          this.$message({
            message: "下载任务已提交，请稍等一会儿",
            type: "success"
          });
          this.formInline.sbId = [0, ""];
          this.getData();
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      } else if (this.activeName == "2") {
        const res = await this.$api.mdscheduleInfo({
          time: this.formInline.time2,
          mid: this.formInline.sbId[1],
          email: this.formInline.email,
          cycle: "每天"
        });
        if (res.status == 0) {
          this.$message({
            message: "下载任务已提交，请稍等一会儿",
            type: "success"
          });
          this.formInline.time2 = "";
          this.getData();
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      }
    },
    async getData2() {
      const res = await this.$api.mmGetMechanicalPage({
        pageSize: 100000,
        pageNow: 1
      });
      this.jcdoptions = res.data.data;
    },
    async getData() {
      if (this.activeName == "1") {
        const res = await this.$api.mpointDpage({
          pageSize: this.jishiShougouPageSize,
          pageNow: this.jishiShougouPage,
          midOrName: this.formInline.sbId[1]
        });
        console.log(res.data.data);
        this.total = res.data.total;
        this.tableData = res.data.data;
        this.tableData.forEach(ele => {
          ele.myStatus =
            ele.realname && ele.realname.status == 0
              ? "待审核"
              : ele.realname && ele.realname.status == 1
              ? "审核通过"
              : "未实名";
        });
      } else if (this.activeName == "2") {
        const res = await this.$api.mdscheduleInfoPage({
          pageSize: this.jishiShougouPageSize,
          pageNow: this.jishiShougouPage,
          midOrName: this.formInline.sbId[1]
        });
        console.log(res.data.data);
        this.total = res.data.total;
        this.tableData = res.data.data;
        this.tableData.forEach(ele => {
          ele.myStatus =
            ele.realname && ele.realname.status == 0
              ? "待审核"
              : ele.realname && ele.realname.status == 1
              ? "审核通过"
              : "未实名";
        });
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        // 添加
        // this.imgFile.append("phone", this.addForm.phone);
        // this.imgFile.append("password", this.addForm.password);
        // this.imgFile.append("nickName", this.addForm.nickName);
        // this.imgFile.append("email", this.addForm.email);
        const res = await this.$api.mCuser({
          phone: this.addForm.phone,
          password: this.addForm.password,
          nickName: this.addForm.nickName,
          email: this.addForm.email,
          role: 0
        });
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      } else {
        if (!this.file) {
          this.file = null;
        }
        if (this.addForm.password == "") {
          this.addForm.password = null;
        }
        this.imgFile.append("file", this.file);
        this.imgFile.append("phone", this.addForm.phone);
        this.imgFile.append("password", this.addForm.password);
        this.imgFile.append("nickName", this.addForm.nickName);
        this.imgFile.append("email", this.addForm.email);
        this.imgFile.append("account", this.rowId);
        this.imgFile.append("standby1", this.addForm.standby1);
        this.imgFile.append("standby2", this.addForm.standby2);
        this.imgFile.append("standby3", this.addForm.standby3);
        this.imgFile.append("standby4", this.addForm.standby4);
        const res = await this.$api.muUpdateUser(this.imgFile);
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
    tongguo(row) {
      window.open(row.downloadUrl);
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
    async jujue(row) {
      if (this.activeName == "1") {
        const res = await this.$api.mpointDelDownload({
          id: row.id
        });
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        }
      } else if (this.activeName == "2") {
        const res = await this.$api.mdscheduleDel({
          quzrtzId: row.quzrtzId
        });
        console.log(res);
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        }
      }
    },
    async getPinlunData() {
      const res = await this.$api.comment_list({
        type: "jishi",
        id: this.pinlunId,
        page: this.biaobaiqiangPinglunPage,
        limit: this.biaobaiqiangPinglunPageSize
      });
      this.pinlunCount = res.data.total;
      this.pinlunList = res.data.data;
      this.pinlunList.forEach(ele => {
        ele.myNickname =
          ele.nickname == "" || !ele.nickname ? "匿名用户" : ele.nickname;
        if (ele.comment_reply_list) {
          ele.comment_reply_list.forEach(item => {
            item.myNickname =
              item.nickname == "" || !item.nickname
                ? "匿名用户"
                : item.nickname;
          });
        }
      });
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
      this.$store.commit("biaobaiqiangPinglunPage", 1);
      this.$store.commit("jishiShougouPage", 1);
      console.log(tab.index);
      this.formInline.sbId = "";
      this.formInline.time = [];
      this.formInline.time2 = "";
      this.getData();
    },
    onRect() {
      this.formInline.sbId = "";
      this.formInline.time = [];
      this.formInline.time2 = "";
      this.getData();
    },
    onSubmit() {
      if (this.formInline.sbId.length != 2) {
        vm.$message({
          message: "该场站下暂无设备,请重新选择",
          type: "warning"
        });
        return;
      }
      this.getData();
    },
    toAddShop() {
      this.imgFile = new FormData();
      this.isAdd = true;
      this.addForm.phone = "";
      this.addForm.imgUrl = "";
      this.addForm.password = "";
      this.addForm.nickName = "";
      for (const key in this.addForm) {
        this.addForm[key] = "";
      }
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