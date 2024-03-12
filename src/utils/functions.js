import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
import {get} from "svelte/store";

export const qa = import.meta.env.VITE_QA;

export const fetchWebonList = async () => {
    return new Promise(async (resolve, reject) => {
        let webonList = []
        try {
            const webonListRaw = await strapi('/webons')
            if (!webonListRaw?.length || webonListRaw.length === 0) {
                reject('No webons found! Please check your connection and try again.')
            }
            console.log(webonListRaw)
            webonList = webonListRaw.filter(webon => {
                console.log(webon)
                if(!webon.public && qa && webon.qa && webon?.qa_download_link) {
                    webon.download_link = webon.qa_download_link
                }
                console.log(webon)
                return qa ? webon.qa : webon.public
            })
            console.log(webonList)
            let installed_webons = []
            try {
                installed_webons = await nomo.getInstalledWebOns()
            } catch (e) {
                console.log(e)
            }
            webonList.forEach(available_webon => {
                available_webon.webon_url = available_webon.download_link.replace('nomo.app/pluginv1/', '');
                available_webon.webon_url = available_webon.download_link.replace('nomo.app/webon/', '');
                if (installed_webons?.manifests) {
                    let match = installed_webons.manifests.find(installed_webon => {
                        return installed_webon.webon_url === available_webon.webon_url || installed_webon.webon_id === available_webon.id
                    });
                    if (match) {
                        available_webon.downloaded = true;
                    }
                }
            });
            resolve(webonList)
        } catch (e) {
            console.error(e)
            if (webonList && webonList.length > 0) {
                resolve(webonList)
            } else {
                reject(e)
            }
        }
    })
}

const strapi_url = 'https://www.webon.info/backend/api'
export const strapi = (endpoint) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await (await fetch(strapi_url + endpoint + '?populate=*')).json()
            if (res.data?.length > 0) {
                resolve(res.data.map(obj => obj.attributes))
            } else if (res.data) {
                resolve(res.data.attributes)
            } else {
                resolve(res.attributes)
            }
        } catch (e) {
            reject(e)
        }
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
            });
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
        });
    })
}

export const image = (img) => {
    return `https://www.webon.info/backend${img.data.attributes.url}`
}