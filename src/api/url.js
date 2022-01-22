export default {
    // 校园帮帮
    baseUrl: 'http://cwapi.bjhfjn.com', //http://cwapi.bjhfjn.com  http://101.34.211.145:9089
    login: '/m/login', //登录
    mstationStationPage:'/mstation/stationPage',//所有场站-分页
    mstationUpdateStation:'/mstation/updateStation',//编辑场站信息
    mUploadImg:'/m/uploadImg',//上传图片
    mCstation:'/m/cstation',//创建场站
    mstationDelStation:'/mstation/delStation',//删除场站
    muGetUsers:'/mu/getUsers',//普通用户列表
    mCuser:'/m/cuser',//创建用户/管理员
    muGetMusers:'/mu/getMusers',//管理员列表
    muDelUser:'/mu/delUser',///mu/delUser
    muUpdateUser:'/mu/updateUser',//编辑用户
    mmGetMechanicalList:'/mm/getMechanicalList',//场站-设备列表分页
    mmGetMechanicalPage:'/mm/getMechanicalPage',///mm/getMechanicalPage
    mmDelMechanical:'/mm/delMechanical',//删除设备
    mmUpdateMechanical:'/mm/updateMechanical',//编辑设备信息
    mBindmtos:'/m/bindmtos',//绑定设备与场站
    mDelmtos:'/m/delmtos',//解绑设备与场站
    mGeteandp:'/m/geteandp',//查询说明或者协议
    mUpeandp:'/m/upeandp',//修改说明或协议
    mstationUsers:'/mstation/users',//场站查询绑定的用户
    mBindstou:'/m/bindstou',//绑定场站与用户
    mDelstou:'/m/delstou',//解绑场站与用户
    mGetkfmb:'/m/getkfmb',//查询客服电话
    memailEmails:'/memail/emails',//邮箱列表
    memailInfo:'/memail/info',//修改发送邮箱
    mUpdateKfMobile:'/m/updateKfMobile',//修改客服电话
    ermw:'/m/qcodes',//公众号二维码
    mUpdateQcode:'/m/updateQcode',//修改公众号二维码
    mpointRealTimeDatas:'/mpoint/realTimeDatas',//测温点列表
    mpointUpdatePoint:'/mpoint/updatePoint',//编辑测温点信息
    mpointGetDatas:'/mpoint/getDatas',//历史数据
    mpointDpage:'/mpoint/dpage',//下载列表
    mpointDownloadHistory:'/mpoint/download-history',//历史数据下载
    mpointDelDownload:'/mpoint/del-download',///mpoint/del-download
    mdscheduleInfoPage:'/mdschedule/info-page',//查询定时任务列表
    mdscheduleInfo:'/mdschedule/info',//添加下载定时任务
    mdscheduleDel:'/mdschedule/del',///mdschedule/del
}