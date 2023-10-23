// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import list from '../assets/webon_list.json'

// export const fetchWebonList = async () => {
//     return (await nomo.authHttp({
//         method: 'GET',
//         url: '/webon_list.json',
//     })
//         .then(async resJson => {
//             const resObj = await JSON.parse(resJson.response)
//             console.log('fetchWebonList', resObj)
//             return resObj
//         })
//         .catch(e => {
//             throw new Error(e)
//         }))
// }

export const fetchWebonList = async () => {
    return list
}