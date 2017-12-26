import http from '../utils/requestAjax';
export default function(api){
    return function(dispatch){
        return function(action){
            const {url,types,params,method="get"} = action;
            if(!url){
                return dispatch(action);
            }
            if(params.page){
                api.dispatch({
                    type:types[0],
                    page: params.page
                })
            }else{
                api.dispatch({
                    type: 'beforeRequest'
                }) 
            }
            if(url && method == "get"){
               http.get({'url':url,'params':params}).then((res)=>{
                    api.dispatch({
                        type: types[1],
                        res: res,
                        reqUrl: params.url
                    })
               }).catch((error)=>{
                   api.dispatch({
                       type:types[2],
                       error:error
                   })
               })
            } else if(url && method == "post"){
                http.post({ 'url': url, 'params': params }).then((res) => {
                    api.dispatch({
                        type: types[1],
                        res: res,
                        reqUrl:params.url,
                        means: params.seach
                    })
                }).catch((error) => {
                    api.dispatch({
                        type: types[2],
                        error: error
                    })
                })
            }
        }
    }
}