// import {nomo} from "nomo-plugin-kit/dist/nomo_api";
import {nomo} from "nomo-webon-kit";
import {nomo_store} from "../stores/nomo_store.js";
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

export const fetchWebonList = async () => {
    const list = await getData('webons/en')
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
export const downloadWebOn = (deeplink) => {
    const prefixedDeeplink = "https://nomo.app/webon/" + deeplink;
    if (deeplink.includes("uniswap")) {
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
            navigateBack: true,
        }).then(() => resolve()).catch((e) => {
            reject(e);
            console.error(e)
        });
    });
}
export const uninstallWebOn = (deeplink) => {
    if (typeof deeplink !== 'string' || deeplink.trim() === '') {
        console.error("Invalid deeplink:", deeplink);
        return Promise.reject("Deeplink is invalid, null, or undefined");
    }

    const prefixedDeeplink = `https://nomo.app/webon/${deeplink.trim()}`;
    console.log("Attempting to uninstall WebOn with URL:", prefixedDeeplink);

    return new Promise((resolve, reject) => {
        nomo.uninstallWebOn({
            webon_url: prefixedDeeplink
        })
            .then(resolve)
            .catch((error) => {
                console.error("Failed to uninstall WebOn:", error);
                reject(error);
            });
    });
}