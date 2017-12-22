export default function(state={},action){
    var newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'beforeRequest':
            newState.shade = "shade";
            newState.loading = "loading";
            newState.iCurPage = action.page;
            newState.moreData = "";
            break;
        case 'requested':
            let data = disposeData(action.res.data);
            newState.dataList = data.dataList;
            newState.total = data.total;
            newState.shade = "shade hide";
            newState.loading = "loading hide";
            break;    
        case 'error':
            newState.err = action.error;
            break;
        case 'requestSingle':
            newState.moreData = dispatchSingle(action.res.data);
            newState.shade = "shade hide";
            newState.loading = "loading hide";
            break;
    }
    return newState;
}

function disposeData(result){
    var reg = /([0]{2}\:){2}[0]{2}$/;
    let res;
    let limit;
    if (result.data1){
        res = result.data1;
        limit = result.data2[0];
    }else{
        res = result;
    }
    res = res.map((item)=>{
        if(item.id){
            delete item.id;
        }
        if(item.keepDate && reg.test(item.keepDate)){
            item.keepDate = item.keepDate.replace(reg,'');
        }
        if (item.birth && reg.test(item.birth)){
            item.birth = item.birth.replace(reg, '');
        }
        return item;
    });
    return{
        dataList: res,
        total: limit.rowsCount
    }
}
function dispatchSingle(res){
    if(res == "ok"){
        return "ok";
    }
    var newData = getNewData(res);
    function getNewData(arr) {
        for (var i = 0; i < arr.length; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i].goodsId == arr[j].goodsId) {
                    arr[i].goodsImg += ',' + arr[j].goodsImg;
                    arr.splice(j, 1);
                    getNewData(arr);
                }
            }
        }
        return arr;
    }
    return newData;
}