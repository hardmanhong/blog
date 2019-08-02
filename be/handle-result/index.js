const {SUCCESS,EXIST,NOT_EXIST}  = require('../service-code');
exports.handleSuccess = (data=null,message='success')=>{
    return {
        code: SUCCESS,
        message,
        data
    }
}

exports.handleWraningExist = (message='数据已存在')=>{
    return {
        code: EXIST,
        message
    }
}
exports.handleWraningNotExist = (message='数据不存在')=>{
    return {
        code: NOT_EXIST,
        message
    }
}