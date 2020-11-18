import axios from "axios"
import qs from "qs"
import vue from "vue"

// 开发环境 
let baseUrl = "/aa"
vue.prototype.$host = "http://localhost:3000" //图片展示不出来需要加后台3000，装容器挂在原型上
// 生产环境
// let baseUrl = ""
// vue.prototype.$host = ""

// 请求拦截
// axios.interceptors.request.use(res=>{
    
// })
// 响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    console.log(res)
    return res
})

// 添加数据
export const reqMenuAdd = (info) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "POST",
        data: qs.stringify(info)
    })
}

//18.列表交互
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 删除数据
export const reqMenuMove = (idS) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "POST",
        data: qs.stringify({
            id: idS
        })
    })
}
// 获取一条数据
export const reqMenuOne = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 修改的数据
export const reqMenuWrite = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 角色添加
export const reqJueAdd = (form) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(form)
    })
}
// 角色列表
export const reqJueList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get"
    })
}
// 角色获取一条
export const reqJueOne = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 角色修改
export const reqJueChange = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: obj

    })
}

// 角色删除
export const reqJueMove = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: {
            id: id
        }
    })
}

// 管理员添加
export const reqMAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: obj
    })
}
// 管理员总页
export const reqMNum = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}
// 管理员列表获取、
export const reqMList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: obj
    })
}
// 管理员删除
export const reqMMove = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}

// 商品分类
export const reqSAdd = (obj) => {
    // 文件不用qs.stringify，用new ForDate
    let f = new FormData()
    for (const key in obj) {
        f.append(key, obj[key])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: f
    })
}
// 商品分类列表
export const reqSList = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: obj
    })
}
// 商品分类获取一条
export const reqMOne = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 商品分类修改
export const reqMXG = (obj) => {
    // 提交有图片 要用formData
    let f = new FormData()
    for (const key in obj) {
        f.append(key, obj[key])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: f
    })
}
// 商品分类删除
export const reqfenleiMove = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method:"post",
        data:{
            id:id
        }
    })
}

// ===========规格接口 开始====================

// 8.添加 文件
export const reqspecsAdd = (user) => {
 
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}

//18.列表 p={page:1,size:10}
export const reqspecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqspecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqspecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqspecsUpdate = (user) => {
   
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
// 商品规格总数
export const reqspecsCount = () => {
   
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// ===========规格接口 结束====================

// ===========商品管理接口 开始====================

// 8.添加 文件
export const reqgoodsAdd = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data:d
    })
}

//18.列表 p={page:1,size:10}
export const reqgoodsList = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

//26.删除
export const reqgoodsDel = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

// 33.详情
export const reqgoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}



// 38.修改 文件
export const reqgoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqgoodsCount = () => {
   
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

// ===========商品管理接口 结束====================

