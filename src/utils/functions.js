// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import prod_list from '../assets/webon_list.json'
import qa_list from '../assets/qa_webon_list.json'
import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
import {get} from "svelte/store";

const qa = import.meta.env.VITE_QA;
const list = qa ? qa_list : prod_list

const reversed_list = list.reverse()


export const fetchWebonList = async () => {
    return new Promise((resolve, reject) => {
        nomo.getInstalledWebOns().then(installed_webons => {
            // console.log(installed_webons)
            // console.log(reversed_list)
            reversed_list.forEach(available_webon => {
                available_webon.webon_url = available_webon.download_link.replace('nomo.app/pluginv1/', '');
                available_webon.webon_url = available_webon.download_link.replace('nomo.app/webon/', '');
                let match = installed_webons.manifests.find(installed_webon => {
                    return installed_webon.webon_url === available_webon.webon_url || installed_webon.webon_id === available_webon.id
                });
                if (match) {
                    available_webon.downloaded = true;
                }
            });
            resolve(reversed_list)
        }).catch(e => {
            console.log(e)
            resolve(reversed_list)
        })
    })
}

export const downloadWebOn = (deeplink) => {
    return new Promise((resolve, reject) => {
        if (deeplink.includes("uniswap")) {
            reject(Error("This WebOn is only supported on Nomo 0.4.0 or higher."));
            return;
        }
        nomo.installWebOn({
            deeplink: deeplink,
            skipPermissionDialog: true,
            navigateBack: true,
        }).then(() => resolve()).catch((e) => {
            reject(e)
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