export function getData(params){
    if(params.id || params.goodsId){
        return {
            types: ['beforeRequest', 'datagridSingle', 'error'],
            'url': params.url,
            'params': params,
            'method': 'post'
        }
    }else if(params.keyWord){
        return {
            types: ['beforeRequest', 'datagridSearch', 'error'],
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