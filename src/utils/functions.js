// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import prod_list from '../assets/webon_list.json'
import qa_list from '../assets/qa_webon_list.json'
import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
import {get} from "svelte/store";
import mockData from '../assets/webon_list.json';
const qa = import.meta.env.VITE_QA;
const list = qa ? qa_list : prod_list

const reversed_list = list.reverse()


export const fetchWebonList = async () => {
    // Simulate an asynchronous API call with static data
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500); // Delay to simulate network call
    });
};
export const downloadWebOn = (deeplink) => {
    if (deeplink.includes("uniswap")) {
        if (!get(nomo_store).metamask_functionality) {
            const err = "This WebOn is only supported on Nomo 0.4.0 or higher.";
            alert(err);
            return Promise.reject(err);
        }
    }
    return new Promise((resolve, reject) => {
        nomo.installWebOn({
            deeplink: deeplink,
            skipPermissionDialog: true,
            navigateBack: true,
        }).then(() => resolve()).catch((e) => {
            reject(e);
            console.error(e)
        }) ;
    })
}

export const uninstallWebOn = (webon_url) => {
    return new Promise((resolve, reject) => {
        nomo.uninstallWebOn({
            webon_url: webon_url
        }).then(() => resolve()).catch((e) => {
            reject(e)
            console.error(e)
        }) ;
    })
}