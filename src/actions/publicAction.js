export function getData(_url, _params){
    return {
        types:['beforeRequest','requested','requestError'],
        url: _url,
        params: _params
    }
}