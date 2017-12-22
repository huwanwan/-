export function goLogin(name,psd){
    return {
        types:['beforeRequest','requested','error'],
        'url':'login.php',
        'params': {phoneNum:name,password:psd}
    }
}
export function closeTips(){
    return {
        type:'close'
    }
}