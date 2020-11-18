<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened="opened" @closed="closed">
      <!-- :rules="rules" 验证规则 -->
      <el-form :model="user">
        <!-- 2.绑定数据 -->
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
            <!-- 6.遍历一级分类 -->

            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" placeholder="请输入市场价格"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src=" imgUrl" alt />

            <input v-if="info.isshow" type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <!-- 11.遍历 -->
          <el-select placeholder="请选择商品规格" v-model="user.specsid" @change="changeSpecsId">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select placeholder="请选择二级分类" v-model="user.specsattr" multiple>
            <el-option v-for="item in attrsList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <!-- 附文本编辑器 -->
 
          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加商品'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
    {{specsList}}
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {reqSList} from "../../../utils/http"
import E from "wangeditor"
export default {
  props:["info"],
  data() {
    return {
    // 渲染二级分类
      secondCateList:[],
    // 渲染二级规格    
      attrsList:[],
    //  图片路径
      imgUrl:"",
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        specsid: "",
        isnew: "",
        ishot: "",
        status: "",
        description:"" ,
        img:null,
        specsattr:[]
      },
    };
  },
  methods: {
    // 弹框结束事件
    opened() {
        let editor = new E("#edit")
        editor.create()
    },
    closed() {},
    // 一级分类的改变事件 一级分类发生改变发起分类请求，一级分类请求数据后双向绑定的一级分类编号做参数发起请求二级分类
    changeFirst() {
        reqSList({pid:this.user.first_cateid}).then(res=>{
            this.secondCateList = res.data.list
        })
    },
    // 上传图片事件
    changeFile(e) {
    // 前台要展示的图片路径
       this.imgUrl = URL.createObjectURL( e.target.files[0])
       this.user.img = e.target.files[0]
       console.log(this.user);
    },
    changeSpecsId() {
        this.user.specsattr = [];
        // 当一级规格发生改变触发二级规格事件
        // 取出数据id号与双向绑定的分类编号一样的在改变时赋值给二级商品规格框
        console.log( this.specsList.find(item=>item.id == this.user.specsid));
        let att = this.specsList.find(item=>item.id == this.user.specsid)
        this. attrsList = JSON.parse(att.attrs)
    },
    // 取消
    cancel() {
        this.info.isshow = false
    },
    // 添加商品
    add() {
        this.user.description = this.editor.txt.html();
    },
    update(){},
    ...mapActions({
        // 获取分类数据一级分类渲染到表单
        a:"shopfenlei/a",
        // 获取一级商品规格
        a:"shopguige/a"
    }),
  },

  mounted() {
      this.a()
  },
  computed: {
    ...mapGetters({
        cateList:"shopfenlei/g",
        // 一级规格数据
        specsList:"shopguige/g"//此时是数组，后台要“[]”
    }),
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
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
</style>