<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="user.pid" placeholder="请选择角色">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="user.pid!==0">
          <!-- 2.element-ui 上传文件 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加'">添 加</el-button>
        <el-button type="primary" v-else @click="XGai">修 改</el-button>
      </div>
      
    </el-dialog>
    
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqSAdd,reqMOne,reqMXG } from "../../../utils/http"
export default {
  props: ["info"],
  data() {
    return {
    // 有表单不用vuex就用双向数据绑定 
      user: {
        catename: "",
        pid: "",
        status: "",
        img:null
      },
      imgUrl:""
    };
  },
  methods: {
    //   清空
    emit(){
        this.user = {
        catename: "",
        pid: "",
        status: "",
        img:null
      }
    },
    //   修改提交修改数据
    XGai(){
        console.log(this.user);
        // this.user.id = 点编辑时打开弹框id传过来已经加在user里了
        reqMXG(this.user).then(res=>{
            this.info.isShow = false
            this.emit()
            // 修改后刷新
            this.a()
        })
    },
    //   获取一条数据的方法等调用
    one(id){
        reqMOne(id).then(res=>{
            this.user = res.data.list
            this.imgUrl =this.$host + res.data.list.img
            this.user.id = id
        })
    },
    changeImg(e) {
        // 后台要的img
        this.user.img = e.raw
        // 前台需要显示的路径
        this.imgUrl = URL.createObjectURL(e.raw)
    },
    // 取消
    reset(){
        this.info.isShow = false
    },
    // 确定添加 
    add(){
        this.info.isShow = false;
        // 添加axios
        reqSAdd(this.user).then(res=>{
            // 添加成功后刷新
            this.a()
        })
    },
    ...mapActions({
        a:"shopfenlei/a"
    }),
  },
  mounted() {
      this.a()
     
  },
  computed: {
    ...mapGetters({
        cateList:"shopfenlei/g"
    }),
  },
};
</script>
<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>