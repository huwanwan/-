export function getData(params){
    return {
        types: ['beforeRequest', 'requested','requestSingle','error'],
        'url':'proprietary.php',
        'params': params,
        'method':'post'
    }
}
export function uploadImg(params){
    return {
        type:'upImg',
        'url':'form.php',
        method:'post',
        'params':params
    }
}