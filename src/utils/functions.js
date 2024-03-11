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
        if (get(nomo_store).install_functionality) {
            nomo.installWebOn({
                deeplink: deeplink,
                skipPermissionDialog: true,
                navigateBack: true,
            }).then(() => resolve()).catch((e) => {
                reject(e)
                console.error(e)
            }) ;
        } else {
            nomo.injectQRCode({qrCode: deeplink, navigateBack: false}).then(() => {
              resolve()
            }).catch((e) => {
                reject(e)
                console.error(e)
            })
        }
    })
}

export const installUrlWebOn = (wURL, wId, wName) => {
    return new Promise((resolve, reject) => {
        const manifest = {
            "nomo_manifest_version": "1.1.0",
            "webon_id": wId,
            "webon_name": wName,
            "min_nomo_version": "0.4.0", // min-version for MetaMask support
            "webon_version": "0.1.0",
            "dependencies": [
                "https://webon3.com/js/ethers.js",
                "https://webon3.com/js/eip712.js",
                "https://webon3.com/js/index.js"
            ],
            "permissions": [
                "nomo.permission.GET_INSTALLED_WEBONS",
                "nomo.permission.SIGN_EVM_TRANSACTION",
                "nomo.permission.SIGN_EVM_MESSAGE"
            ],
            "webon_url": wURL,
        }

        nomo.installUrlAsWebOn({
            // static/qa_manifest.json
            manifest: manifest,
            navigateBack: false,
            skipPermissionDialog: true,
        }).then(() => resolve()).catch((e) => {
            reject(e)
            console.error(e)
        });
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