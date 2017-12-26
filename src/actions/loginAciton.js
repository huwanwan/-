export function goLogin(name,psd){
    return {
        types:['beforeLogin','loginRequested','errorLogin'],
<<<<<<< HEAD
        'url':'staff.php',
        'params': {username:name,password:psd},
        method:'post'
=======
        method:'post',
        'url':'staff.php',
        'params': {username:name,password:psd}
>>>>>>> 723340d67f661b529759775a904b0027336400ee
    }
}
export function closeTips(){
    return {
        type:'close'
    }
}