export default function LoginRudex(state={},action){
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case 'beforeRequest':
            newState = {
                class:'float',
                err: 'hide'
            }
            break;
        case 'requested':
            newState = testRes(action.res);
            break;
        case 'requertError':
            newState = {
                class: 'float hide',
                status:false,
                err: ''
            }
            break;
        case 'close':
            newState = {
                err : 'hide'
            }
            break;
    }
    return newState;
}
function testRes(res){
    if (res.data === true){
        return {
            status: true,
            class: 'float hide',
            err:'hide'
        }
    }else{
        return {
            status: false,
            class: 'float hide',
            err:''
        }
    }
}