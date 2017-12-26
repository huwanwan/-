/* 
* @Author: Marte
* @Date:   2017-12-07 17:33:59
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-12 12:00:23
*/
import axios from 'axios';
import qs from 'qs';
<<<<<<< HEAD
var baseUrl = 'http://10.3.135.254:2018/';
=======
var baseUrl = 'http://10.3.135.242:666/';
>>>>>>> 723340d67f661b529759775a904b0027336400ee
var fliterUrl = function (url) {
    if (url.startsWith('http')) {
        return url;
    }
    return baseUrl + url;
}
export default {
    get: (opt) => {
        return new Promise((resolve, reject) => {
            axios.get(fliterUrl(opt.url), { params: opt.params }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    
    post: (opt) => {
        return new Promise((reslove, reject) => {
            axios({
                url: fliterUrl(opt.url),
                data: qs.stringify(opt.params),
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response) => {
                reslove(response);
            })
                .catch((error) => {
                    reject(error);
                }
                );

        })
    }
}
