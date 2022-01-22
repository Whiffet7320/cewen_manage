<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">其他设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" label-width="110px" :model="formInline" class="demo-form-inline">
          <el-form-item label="类型：">
            <el-radio-group v-model="formInline.rad1" size="small" @change="changRad1">
              <el-radio-button label="0">客服电话</el-radio-button>
              <el-radio-button label="1">邮箱</el-radio-button>
              <el-radio-button label="2">公众号二维码</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-row :span="22" v-if="formInline.rad1 == 0">
            <el-col style="margin-top:20px">
              <el-form-item label="客服电话：">
                <el-input size="small" v-model="formInline.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="系统邮箱服务器：">
                <el-input size="small" v-model="formInline.host"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="邮箱名：">
                <el-input size="small" v-model="formInline.username"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="邮箱密码：">
                <el-input size="small" v-model="formInline.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="邮箱端口：">
                <el-input size="small" v-model="formInline.port"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="协议：">
                <el-input size="small" v-model="formInline.protocol"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 1">
            <el-col style="margin-top:20px">
              <el-form-item label="默认编码：">
                <el-input size="small" v-model="formInline.defaultEncode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="22" v-if="formInline.rad1 == 2">
            <el-col style="margin-top:20px">
              <el-form-item label="图片：">
                <div @click="companyList('tx')" class="myImg">
                  <el-image :src="formInline.qcode" fit="fill" style="width: 200px; height: 200px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btnflex">
          <!-- <el-button size="small" type="primary" @click="submitForm('ruleForm', '3')">下一步</el-button> -->
          <el-button size="small" type="primary" @click="onSubmitForm">保存</el-button>
        </div>
      </div>
    </div>
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
// import E from "wangeditor";
export default {
  data() {
    return {
      file:null,
      emailId: "",
      formInline: {
        rad1: "0",
        desc: "",
        host: "",
        mobile:'',
      },
      editor: null,
      imgFile: null,
      ruleForm: {
        img: "",
        other_url: ""
      },
      content: ""
    };
  },
  created() {
    this.imgFile = new FormData();
    this.getData();
    this.getKefu();
  },
  methods: {
    async getData() {
      const res = await this.$api.mGeteandp({
        type: this.formInline.rad1
      });
      console.log(res);
      this.formInline.desc = res.data;
      if (this.content) {
        this.editor.txt.html(this.content);
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
      this.$set(this.formInline, "qcode", url);
    },
    async getKefu() {
      const res = await this.$api.mGetkfmb();
      console.log(res);
      this.formInline.mobile = res.data
    },
    async getErweima(){
      const res = await this.$api.ermw();
      this.$set(this.formInline,'qcode',res.data.qcode)
    },
    async getEmail() {
      const res = await this.$api.memailEmails();
      const eml = res.data.data[0];
      this.emailId = eml.id;
      this.formInline.defaultEncode = eml.defaultEncode;
      this.formInline.host = eml.host;
      this.formInline.port = eml.port;
      this.formInline.protocol = eml.protocol;
      this.formInline.username = eml.username;
    },
    async onSubmitForm() {
      if (this.formInline.rad1 == "1") {
        const res = await this.$api.memailInfo({
          id: this.emailId,
          defaultEncode: this.formInline.defaultEncode,
          host: this.formInline.host,
          port: this.formInline.port,
          protocol: this.formInline.protocol,
          username: this.formInline.username,
          password:
            this.formInline.password == "" ? null : this.formInline.password
        });
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getEmail();
        }
      }else if(this.formInline.rad1 == "0"){
        const res = await this.$api.mUpdateKfMobile({
          mobile: this.formInline.mobile,
        });
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getKefu();
        }
      }else if(this.formInline.rad1 == "2"){
        // mUpdateQcode
        console.log(this.file)
        if (!this.file) {
          this.file = null;
        }
        this.imgFile.append("file", this.file);
        const res = await this.$api.mUpdateQcode(this.imgFile);
        if (res.status == 0) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getErweima();
        }
      }
    },
    changRad1(e) {
      console.log(e);
      if (e == 0) {
        this.getKefu();
      } else if (e == 1) {
        this.getEmail();
      }else if(e==2){
        this.getErweima();
      }
      // this.getData();
    },
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    }
  }
  // async mounted() {
  //   this.editor = new E("#editor");
  //   this.editor.config.menus = [
  //     "head",
  //     "bold",
  //     "fontSize",
  //     "fontName",
  //     "italic",
  //     "underline",
  //     "strikeThrough",
  //     "indent",
  //     "lineHeight",
  //     "foreColor",
  //     "backColor",
  //     "list",
  //     "justify",
  //     "emoticon",
  //     "image",
  //     "table",
  //     "undo",
  //     "redo"
  //   ];
  //   this.editor.config.uploadImgServer = "/upload-img";
  //   // this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
  //   const res = await this.$api.uploadToken();
  //   let myData = res.data;
  //   let client = new window.OSS.Wrapper({
  //     region: myData.region, //oss地址
  //     accessKeyId: myData.accessKeyId, //ak
  //     accessKeySecret: myData.accessKeySecret, //secret
  //     stsToken: myData.stsToken,
  //     bucket: myData.bucket //oss名字
  //   });
  //   this.editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
  //     var file_re = await this.readFileAsBuffer(resultFiles[0]);
  //     client
  //       .put("myImg", file_re)
  //       .then(function(res) {
  //         // 上传图片，返回结果，将图片插入到编辑器中
  //         console.log(res);
  //         insertImgFn(res.url);
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //   };
  //   this.editor.create();
  //   if (this.content) {
  //     this.editor.txt.html(this.content);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.index {
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
      width: 100%;
    }
    /deep/ .el-form-item__content {
      width: 90%;
    }
  }
  .myImg {
    position: relative;
    width: 200px;
    height: 200px;
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
      width: 198px;
      height: 198px;
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
// 商品详情
.myEditor {
  padding-top: 20px;
  display: flex;
  .txt {
    color: #606266;
    width: 90px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
  }
}
.btnflex {
  margin-top: 20px;
  margin-left: 48px;
}
</style>