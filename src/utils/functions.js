// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import list from '../assets/webon_list.json'
import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
import {get} from "svelte/store";

const reversed_list = list.reverse()

export const fetchWebonList = async () => {
    return new Promise((resolve, reject) => {
        nomo.getInstalledWebOns().then(installed_webons => {
            console.log('Installed:', installed_webons)
            reversed_list.forEach(available_webon => {
                available_webon.webon_url = available_webon.download_link.replace('nomo.app/pluginv1/', '');
                let match = installed_webons.manifests.find(installed_webon => installed_webon.webon_url === available_webon.webon_url);
                if (match) {
                    available_webon.downloaded = true;
                }
            });
            console.log('Available:', reversed_list)
            resolve(reversed_list)
        }).catch(e => {
            console.log(e)
            reject(e)
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