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
<<<<<<< HEAD
                    type: types[0],
=======
                    type:types[0],
>>>>>>> 723340d67f661b529759775a904b0027336400ee
                    page: params.page
                })
            }else{
                api.dispatch({
<<<<<<< HEAD
                    type: types[0]
=======
                    type: 'beforeRequest'
>>>>>>> 723340d67f661b529759775a904b0027336400ee
                }) 
            }
            if(url && method == "get"){
               http.get({'url':url,'params':params}).then((res)=>{
                    api.dispatch({
                        type: types[1],
                        res: res,
<<<<<<< HEAD
                        iCurUrl:url,
                        keyWord:params.keyWord
                    })
               }).catch((error)=>{
                   api.dispatch({
                       type: types[2],
=======
                        reqUrl: params.url
                    })
               }).catch((error)=>{
                   api.dispatch({
                       type:types[2],
>>>>>>> 723340d67f661b529759775a904b0027336400ee
                       error:error
                   })
               })
            } else if(url && method == "post"){
                http.post({ 'url': url, 'params': params }).then((res) => {
                    api.dispatch({
                        type: types[1],
                        res: res,
<<<<<<< HEAD
                        iCurUrl: url,
                        keyWord: params.keyWord
=======
                        reqUrl:params.url,
                        means: params.seach
>>>>>>> 723340d67f661b529759775a904b0027336400ee
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