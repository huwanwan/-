export function getData(params){
    if (params.id || params.goodsId || params.position){
        return {
            types: ['beforeRequest', 'datagridSingle', 'error'],
            'url': params.url,
            'params': params,
            'method': 'post'
        }
    }else{
        return {
            types: ['beforeRequest' ,'datagridRequest','error'],
            'url':params.url,
            'params': params,
            'method':'post'
        }
    }
}
// export function uploadImg(params){
//     return {
//         type:'upImg',
//         'url':'form.php',
//         method:'post',
//         'params':params
//     }
// }