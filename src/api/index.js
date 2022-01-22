import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'token': sessionStorage.getItem("token"),
            'headerAccount': sessionStorage.getItem("userName"),
            'headerToken': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'headerAccount': sessionStorage.getItem("userName"),
            'headerToken': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'headerAccount': sessionStorage.getItem("userName"),
            'headerToken': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'headerAccount': sessionStorage.getItem("userName"),
            'headerToken': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
            }
        })
    },
    user_list(obj) {
        return myGet({
            url: `${urls.user_list}`,
            params: {
                ...obj
            }
        })
    },
    mstationStationPage(obj) {
        return myGet({
            url: `${urls.mstationStationPage}`,
            params: {
                ...obj
            }
        })
    },
    mstationDelStation(obj) {
        return myPost({
            url: urls.mstationDelStation,
            params: {
                ...obj
            }
        })
    },
    muGetUsers(obj) {
        return myGet({
            url: `${urls.muGetUsers}`,
            params: {
                ...obj
            }
        })
    },
    muGetMusers(obj) {
        return myGet({
            url: `${urls.muGetMusers}`,
            params: {
                ...obj
            }
        })
    },
    muDelUser(obj) {
        return myPost({
            url: urls.muDelUser,
            params: {
                ...obj
            }
        })
    },
    mCuser(obj) {
        return myPost({
            url: urls.mCuser,
            data: {
                ...obj
            }
        })
    },
    mmGetMechanicalList(obj) {
        return myGet({
            url: `${urls.mmGetMechanicalList}`,
            params: {
                ...obj
            }
        })
    },
    mmGetMechanicalPage(obj) {
        return myGet({
            url: `${urls.mmGetMechanicalPage}`,
            params: {
                ...obj
            }
        })
    },
    mmDelMechanical(obj) {
        return myPost({
            url: urls.mmDelMechanical,
            params: {
                ...obj
            }
        })
    },
    mBindmtos(obj) {
        return myPost({
            url: urls.mBindmtos,
            params: {
                ...obj
            }
        })
    },
    mDelmtos(obj) {
        return myPost({
            url: urls.mDelmtos,
            params: {
                ...obj
            }
        })
    },
    mGeteandp(obj) {
        return myGet({
            url: `${urls.mGeteandp}`,
            params: {
                ...obj
            }
        })
    },
    mUpeandp(obj) {
        return myPost({
            url: urls.mUpeandp,
            data: {
                ...obj
            }
        })
    },
    mBindstou(obj) {
        return myPost({
            url: urls.mBindstou,
            params: {
                ...obj
            }
        })
    },
    mstationUsers(obj) {
        return myGet({
            url: `${urls.mstationUsers}`,
            params: {
                ...obj
            }
        })
    },
    mDelstou(obj) {
        return myPost({
            url: urls.mDelstou,
            params: {
                ...obj
            }
        })
    },
    mGetkfmb(obj) {
        return myGet({
            url: `${urls.mGetkfmb}`,
            params: {
                ...obj
            }
        })
    },
    memailEmails(obj) {
        return myGet({
            url: `${urls.memailEmails}`,
            params: {
                ...obj
            }
        })
    },
    memailInfo(obj) {
        return myPost({
            url: urls.memailInfo,
            data: {
                ...obj
            }
        })
    },
    mUpdateKfMobile(obj) {
        return myPost({
            url: urls.mUpdateKfMobile,
            params: {
                ...obj
            }
        })
    },
    ermw(obj) {
        return myGet({
            url: `${urls.ermw}`,
            params: {
                ...obj
            }
        })
    },
    mpointRealTimeDatas(obj) {
        return myGet({
            url: `${urls.mpointRealTimeDatas}`,
            params: {
                ...obj
            }
        })
    },
    mpointUpdatePoint(obj) {
        return myPost({
            url: urls.mpointUpdatePoint,
            data: {
                ...obj
            }
        })
    },
    mpointGetDatas(obj) {
        return myPost({
            url: urls.mpointGetDatas,
            data: {
                ...obj
            }
        })
    },
    mpointDownloadHistory(obj) {
        return myPost({
            url: urls.mpointDownloadHistory,
            data: {
                ...obj
            }
        })
    },
    mpointDelDownload(obj) {
        return myPost({
            url: urls.mpointDelDownload,
            params: {
                ...obj
            }
        })
    },
    mdscheduleInfoPage(obj) {
        return myGet({
            url: `${urls.mdscheduleInfoPage}`,
            params: {
                ...obj
            }
        })
    },
    mdscheduleInfo(obj) {
        return myPost({
            url: urls.mdscheduleInfo,
            data: {
                ...obj
            }
        })
    },
    mpointDpage(obj) {
        return myGet({
            url: `${urls.mpointDpage}`,
            params: {
                ...obj
            }
        })
    },
    mdscheduleDel(obj) {
        return myPost({
            url: urls.mdscheduleDel,
            params: {
                ...obj
            }
        })
    },
    async mUpdateQcode(obj) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.mUpdateQcode}`,
        obj, configs);
        return res.data
    },
    async mmUpdateMechanical(obj) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.mmUpdateMechanical}`,
        obj, configs);
        console.log(res.data)
        return res.data
    },
    async mCstation(obj) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.mCstation}`,
        obj, configs);
        console.log(res.data)
        return res.data
    },
    // mstationUpdateStation(obj) {
    //     return myPost({
    //         url: urls.mstationUpdateStation,
    //         data: {
    //             ...obj
    //         }
    //     })
    // },
    async muUpdateUser(obj) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.muUpdateUser}`,
        obj, configs);
        return res.data
    },
    async mstationUpdateStation(obj) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.mstationUpdateStation}`,
        obj, configs);
        return res.data
    },
    async mUploadImg(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'headerAccount': sessionStorage.getItem("userName"),
                'headerToken': sessionStorage.getItem("token"),
            },
        };
        const res = await axios.post(`${urls.baseUrl}${urls.mUploadImg}`, image, configs);
        return res.data
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
}