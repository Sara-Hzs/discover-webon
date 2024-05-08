
// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
import {data} from "../stores/data.js";

import {get} from "svelte/store";


const backend_url = "https://webon.info/api/"
export const getData = (endpoint) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await (await fetch(backend_url + endpoint)).json()
            console.log(res)
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}

const mergeInstalledList = async () => {
    try {
        const installed_webons = (await nomo.getInstalledWebOns())?.manifests
        console.log('Installed:', installed_webons)
        if (get(data)?.installed_webons?.length > 0) {
            const installedIds = installed_webons.map(webon => webon.webon_id);
            for (const webon of get(data).webonList) {
                webon.downloaded = installedIds.includes(webon?.id);
                const installedWebon = get(data).installed_webons.find(installed => installed.webon_id === webon?.id);
                webon.webon_url = installedWebon ? installedWebon.webon_url : null;
            }
        }
    } catch (e) {
        console.error(e)
        get(data).installed_webons = []
    }
}


export const fetchWebonList = async () => {
    const list = await getData('webons/en')
    console.log('YES', list)
    return Promise.resolve(list);
};

export const filterWebonList = async (list, selectedLanguage, selectedTags) => {
    const filteredList = list.filter(webon => {
        const languageMatch = selectedLanguage ? webon.language === selectedLanguage : true;
        const tagsMatch = selectedTags.length > 0 ? selectedTags.every(tag => webon.tags && webon.tags.includes(tag)) : true;
        return languageMatch && tagsMatch;
    });
    return Promise.resolve(filteredList);
};

export const fetchTagsList = async () => {
    const tags = await getData('tags/en')
    console.log(tags)
    return Promise.resolve(tags);
}

export const updateWebonInList = (domain, isDownloaded) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Changing ', domain, isDownloaded,  "https://nomo.app/webon/" + domain);

            const updatedWebonList = get(data).webonList.map(webon => {
                if (webon.domain === domain) {
                    return { ...webon, downloaded: isDownloaded, webon_url: "https://nomo.app/webon/" + domain};
                }
                return webon;
            });

            // Update download status in filteredList
            const updatedFilteredList = get(data).filteredList.map(webon => {
                if (webon.domain === domain) {
                    return { ...webon, downloaded: isDownloaded, webon_url: "https://nomo.app/webon/" + domain};
                }
                return webon;
            });

            get(data).webonList = updatedWebonList;
            get(data).filteredList = updatedFilteredList;

            console.log(get(data))
            console.log((await nomo.getInstalledWebOns()).manifests)



            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}


export const downloadWebOn = (domain) => {
    const prefixedDeeplink = "https://nomo.app/webon/" + domain;
    if (domain.includes("uniswap")) {
        if (!get(nomo_store).metamask_functionality) {
            const err = "This WebOn is only supported on Nomo 0.4.0 or higher.";
            alert(err);
            return Promise.reject(err);
        }
    }
    return new Promise((resolve, reject) => {
        nomo.installWebOn({
            deeplink: prefixedDeeplink,
            skipPermissionDialog: true,
            navigateBack: false,
        }).then(async () => {
            await updateWebonInList(domain, true)
            resolve()
        }).catch((e) => {
            console.error("Error during installation:", e);
            reject(e);
        });
    });
}
export const uninstallWebOn = (domain) => {
    return new Promise((resolve, reject) => {
        nomo.uninstallWebOn({
            webon_url: domain
        }).then(async () => {
            await updateWebonInList(domain, false)
            console.log("WebOn uninstalled successfully");
            resolve();
        }).catch((e) => {
            console.error("Error during uninstallation:", JSON.stringify(e, null, 2));
            reject(e);
        });
    });
};