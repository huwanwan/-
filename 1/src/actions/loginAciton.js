export function goLogin(name,psd){
    return {
        types:['beforeLogin','loginRequested','errorLogin'],
        method:'post',
        'url':'staff.php',
        'params': {username:name,password:psd}
    }
}
export function closeTips(){
    return {
        type:'close'
    }
}