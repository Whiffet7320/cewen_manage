<template>
  <div class="index">
    <div class="myForm">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- <el-form-item>
          <el-button size="small" type="primary" @click="chooseJcd">选择监测点</el-button>
        </el-form-item> -->
        <el-form-item label="时间：">
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
        <el-form-item label="间隔：">
          <el-select size="small" v-model="formInline.space" placeholder="间隔">
            <el-option label="日" value="日"></el-option>
            <el-option label="时" value="时"></el-option>
            <el-option label="分" value="分"></el-option>
            <el-option label="秒" value="秒"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="间隔值：">
          <el-input size="small" type="number" v-model="formInline.spaceNum"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select size="small" v-model="formInline.valueType">
            <el-option label="实时值" value="实时值"></el-option>
            <el-option label="最大值" value="最大值"></el-option>
            <el-option label="最小值" value="最小值"></el-option>
            <el-option label="累加值" value="累加值"></el-option>
            <el-option label="平均值" value="平均值"></el-option>
            <el-option label="差值" value="差值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模式：">
          <el-select size="small" @change="changeMoshi" v-model="formInline.xianshi">
            <el-option label="图表显示" value="1"></el-option>
            <el-option label="数值显示" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tubiao">
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="0" class="demo-addForm">
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-tree
                  style="height:700px;"
                  :props="treeprops"
                  :load="loadNode"
                  ref="tree"
                  lazy
                  show-checkbox
                  node-key="id"
                  @check-change="handleCheckChange"
                ></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row> -->
        </el-form>
      </div>
      <div v-if="formInline.xianshi == '1'" id="main1"></div>
      <div v-else class="myTable" style="margin-left:10px">
        <vxe-table height="700" :data="tableData">
          <vxe-table-column width="200" field="time" title="时间"></vxe-table-column>
          <!-- <vxe-table-column field="temperature" title="时间"></vxe-table-column> -->
          <vxe-table-column
            v-for="(item,i) in sku"
            :key="i"
            :field="`temperature${[i]}`"
            :title="item.fixed"
            min-width="200"
            show-overflow="title"
          ></vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- <div v-if="formInline.xianshi == '1'" id="main1"></div>
    <div v-else class="myTable">
      <vxe-table height="700" :data="tableData">
        <vxe-table-column width="200" field="time" title="时间"></vxe-table-column>
        <vxe-table-column
          v-for="(item,i) in sku"
          :key="i"
          :field="`temperature${[i]}`"
          :title="item.fixed"
          min-width="200"
          show-overflow="title"
        ></vxe-table-column>
      </vxe-table>
    </div> -->
    <!-- <div id="main2"></div>
    <div id="main3"></div>-->
    <!-- 选择监测点 -->
    <el-dialog
      title="选择监测点"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="监测点">
                <el-tree
                  style="height:400px;overflow-y: scroll;"
                  :props="treeprops"
                  :load="loadNode"
                  ref="tree"
                  lazy
                  show-checkbox
                  node-key="id"
                  @check-change="handleCheckChange"
                ></el-tree>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage", "jishiShougouPageSize"])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData3();
    },
    jishiShougouPageSize: function(pageSize) {
      this.$store.commit("jishiShougouPageSize", pageSize);
      this.getData3();
    }
  },
  data() {
    return {
      sku: [],
      tableData: [],
      total: 0,
      myChart1: null,
      jcdArr: [],
      datatime: "",
      addForm: {},
      treedata: [],
      treeprops: {
        label: "mechanicalName",
        children: "child",
        isLeaf: "leaf"
      },
      addDialogVisible: false,
      formInline: {
        time: [],
        space: "日",
        spaceNum: 1,
        valueType: "实时值",
        xianshi: "1"
      }
    };
  },
  created() {
    // this.getData();
    this.getJcdData();
    this.datatime = this.getNowDay();
  },
  methods: {
    async handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      if (data.disabled) {
        return;
      }
      if (checked) {
        this.jcdArr.push(data.id);
      } else {
        this.jcdArr.forEach((ele, i) => {
          if (data.id == ele) {
            this.jcdArr.splice(i, 1);
          }
        });
      }
    },
    changeMoshi(e) {
      if (e == 2) {
        if (this.myChart1) {
          this.myChart1.dispose();
        }
      }
    },
    async AddOnSubmit() {
      console.log([...new Set(this.jcdArr)].toString());
      this.addDialogVisible = false;
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        await this.getJcdData();
        return resolve(this.treedata);
      } else {
        const res = await this.$api.mpointRealTimeDatas({
          mid: node.data.id,
          date: this.datatime
        });
        const data = JSON.parse(
          JSON.stringify(res.data).replace(/itemName/g, "mechanicalName")
        );
        data.forEach(ele => {
          this.$set(ele, "leaf", true);
        });
        this.$set(this.treedata, "child", data);
        return resolve(data);
      }
    },
    getNowDay() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month =
        nowDate.getMonth() + 1 < 10
          ? "0" + (nowDate.getMonth() + 1)
          : nowDate.getMonth() + 1;
      var day =
        nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      return dateStr;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async onSubmit() {
      if (this.myChart1) {
        this.myChart1.dispose();
      }
      if (this.formInline.xianshi == 1) {
        this.getData2();
      } else if (this.formInline.xianshi == 2) {
        this.getData3();
      }
    },
    async getJcdData() {
      const res = await this.$api.mmGetMechanicalPage({
        pageSize: 100000,
        pageNow: 1,
        mid: ""
      });
      this.$set(this, "treedata", res.data.data);
      this.treedata.forEach(ele => {
        this.$set(ele, "disabled", true);
      });
      console.log(this.treedata);
    },
    chooseJcd() {
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
    },
    async getData3() {
      this.sku = [];
      this.tableData = [];
      const loading = this.$loading({
        lock: true,
        text: "数据表格正在加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.mpointGetDatas({
        endDate: this.formInline.time[1],
        startDate: this.formInline.time[0],
        pageNow: 1,
        pageSize: 1000000,
        pid: [...new Set(this.jcdArr)].toString(),
        space: this.formInline.space,
        spaceNum: this.formInline.spaceNum,
        valueType: this.formInline.valueType
      });
      console.log(res);
      var tableData = res.data;
      tableData.forEach((ele, i) => {
        this.sku.push({
          fixed: `${ele.data[0].point}(${ele.data[0].sname}-${ele.data[0].mname})`,
          val: []
        });
        if (ele.total > 0) {
          ele.data.forEach((ele2, i2) => {
            if (i == 0) {
              this.tableData.push(ele2);
              this.$set(
                this.tableData[i2],
                `temperature${i}`,
                ele2.temperature
              );
            } else {
              this.$set(
                this.tableData[i2],
                `temperature${i}`,
                ele2.temperature
              );
            }
            // if (i2 == ele.total - 1) {
            //   return;
            // }
            // this.tableData.push(ele2);
            // this.sku[i].val.push({
            //   temperature: ele2.temperature
            // });
          });
        }
        console.log(this.tableData, this.sku);
      });
      console.log(this.sku);
      loading.close();
    },
    async getData2() {
      const loading = this.$loading({
        lock: true,
        text: "数据图表正在加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      const res = await this.$api.mpointGetDatas({
        endDate: this.formInline.time[1],
        startDate: this.formInline.time[0],
        pageNow: 1,
        pageSize: 10000000,
        pid: [...new Set(this.jcdArr)].toString(),
        space: this.formInline.space,
        spaceNum: this.formInline.spaceNum,
        valueType: this.formInline.valueType
      });
      console.log(res);
      loading.close();
      if (res.status != 0) {
        this.$message.error(res.msg);
        return;
      }
      var chartDom1 = document.getElementById("main1");
      this.myChart1 = echarts.init(chartDom1);
      var option1 = {
        title: {
          x: "20",
          text: "数据统计(温度-时间)"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // left:"right",
          right: "10%",
          width: "60%",
          height: "10%",
          type: "scroll"
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "200",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: []
      };
      let week_orderKeyArr = [];
      // let week_orderZhiArr = [];
      res.data.forEach((ele, i) => {
        let week_orderZhiArr = [];
        let week_orderKeyArrFlag = true;
        if (ele.total > 0) {
          ele.data.forEach(ele2 => {
            if (week_orderKeyArrFlag) {
              if (week_orderKeyArr.length < ele.total) {
                week_orderKeyArr.push(ele2.time);
              }
            }
            week_orderZhiArr.push(Number(ele2.temperature));
            this.$set(option1.series, i, {
              name: `${ele2.point}(${ele2.sname}-${ele2.mname})`,
              type: "line"
            });
          });
          this.$set(option1.series[i], "data", week_orderZhiArr);
        }
      });
      // this.$set(option1.series[0],'data',week_orderZhiArr)
      option1.xAxis.data = week_orderKeyArr;
      console.log(option1);
      option1 && this.myChart1.setOption(option1);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
/deep/ .el-tree-node__label {
  font-size: 12px;
}
.tubiao{
  background: #ffffff;
  display: flex;
}
.myAddForm {
  border: 1px solid   #caced6;
  padding: 10px;
  // background: #eeeeee;
  width: 260px;
  // /deep/ .el-form-item__content{
  //   margin-left: 10px !important;
  // }
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
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
.myForm {
  margin-bottom: 20px;
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
  }
  /deep/ .el-input {
    width: 106px;
    font-size: 12px;
  }
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(3) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 33.3%;
    background: #ffffff;
    margin-right: 16px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .icon1.i1-2 {
      background: #fff3e0;
      .icon2.i1-2 {
        background: #ffab2b;
      }
    }
    .icon1.i1-3 {
      background: #eaf9e1;
      .icon2.i1-3 {
        background: #6dd230;
      }
    }
    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #e4ecff;
      .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #4d7cfe;
        .el-icon-s-order {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-release {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim {
          font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .tit {
      margin-left: 30px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        color: rgb(37, 38, 49);
        font-size: 24px;
      }
      .txt2 {
        color: rgb(152, 169, 188);
        font-size: 12px;
      }
    }
  }
}
#main1 {
  width: 100%;
  height: 700px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main2 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main3 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
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
</style>