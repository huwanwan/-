export function getData(params){
<<<<<<< HEAD
    if(params.id || params.goodsId){
=======
    if (params.id || params.goodsId || params.position){
>>>>>>> 723340d67f661b529759775a904b0027336400ee
        return {
            types: ['beforeRequest', 'datagridSingle', 'error'],
            'url': params.url,
            'params': params,
            'method': 'post'
        }
<<<<<<< HEAD
    }else if(params.keyWord){
        return {
            types: ['beforeRequest', 'datagridSearch', 'error'],
            'url': params.url,
            'params': params,
            'method': 'post'
        }
=======
>>>>>>> 723340d67f661b529759775a904b0027336400ee
    }else{
        return {
            types: ['beforeRequest' ,'datagridRequest','error'],
            'url':params.url,
            'params': params,
            'method':'post'
        }
    }
<<<<<<< HEAD
}
=======
}

>>>>>>> 723340d67f661b529759775a904b0027336400ee
