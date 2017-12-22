import http from '../utils/requestAjax';
export default function(api){
    return function(dispatch){
        return function(action){
            const {url,type,params,method="get"} = action;
            if(!url){
                return dispatch(action);
            }
            var iCurPage;
            if (params){
                iCurPage = params.page;
            }else{
                iCurPage = 1;
            }
            api.dispatch({
                type:'beforeRequest',
                page: iCurPage
            })
            if(url && method == "get"){
               http.get({'url':url,'params':params}).then((res)=>{
                    if (params.goodsId){
                        api.dispatch({
                            type: 'requestSingle',
                            res: res,
                            page: iCurPage
                        })
                    }else{
                        api.dispatch({
                           type:'requested',
                           res : res,
                           page: iCurPage
                        })
                   }
               }).catch((error)=>{
                   api.dispatch({
                       type:'requertError',
                       error:error,
                       page: iCurPage
                   })
               })
            } else if(url && method == "post"){
                http.post({ 'url': url, 'params': params }).then((res) => {
                    if (params.goodsId) {
                        api.dispatch({
                            type: 'requestSingle',
                            res: res,
                            page: iCurPage
                        })
                    } else {
                        api.dispatch({
                            type: 'requested',
                            res: res,
                            page: iCurPage
                        })
                    }
                }).catch((error) => {
                    api.dispatch({
                        type: 'requertError',
                        error: error,
                        page: iCurPage
                    })
                })
            }
        }
    }
}