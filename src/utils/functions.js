
import {isFallbackModeActive, nomo, nomoGetPlatformInfo} from "nomo-webon-kit";
import { nomo_store } from "../stores/nomo_store.js";
import { data } from "../stores/data.js";
import { get } from "svelte/store";
import { filters } from "../stores/filters.js";

const backend_url = "https://webon.info/api/";

export const getData = (endpoint) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await (await fetch(backend_url + endpoint)).json();
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });
};

export const mergeInstalledList = async () => {
    try {
        const installed_webons = (await nomo.getInstalledWebOns())?.manifests;
        console.log('InstalledWebons:', JSON.stringify(installed_webons, null, 2));

        const webonList = get(data).webonList;

        webonList.forEach(webon => {
            webon.downloaded = installed_webons.some(install =>
                webon.id === install.webon_id || webon.name === install.webon_name
            );
        });

        data.set({ ...get(data) });
    } catch (e) {
        console.error(e);
        get(data).installed_webons = [];
        get(data).webonList.forEach(webon => webon.downloaded = false);
        data.set({ ...get(data) });
    }
};



function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

export function isInsideNomo() {
    return !isFallbackModeActive();
}

export const whereAmI = async () => {
    const inNomo = isInsideNomo();


    if (inNomo) {
        try {
            const executionInfo = await nomoGetPlatformInfo();


            if (executionInfo.clientName.includes("NOMO")) {


                switch (executionInfo.operatingSystem.toLowerCase()) {
                    case "linux":
                    case "macos":
                    case "windows":

                        return "desktop_nomo";
                    case "hub":

                        return "hub";
                    default:

                        return "nomo";
                }
            }


            return "nomo";
        } catch (error) {

            return "nomo";
        }
    } else {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;


        if (/android/i.test(userAgent)) {

            return "android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {

            return "ios";
        }

        return "desktop";
    }
};

export const checkShouldBeVisible = (platform, element) => {
    return element[platform]
}

const filterWebOnsByPlatform = (webon, platform) => {
    if (!isInsideNomo())
        return true
    switch (platform) {
        case "desktop_nomo":
            return webon.platform.desktop
        case "hub":
            return webon.platform.hub
        case "nomo":
            return webon.platform.mobile
    }
};

export const fetchWebonList = async () => {
    const list = await getData('webons/en');
    const platform = await whereAmI();
    const filteredList = list
        .filter(webon => webon.id !== 'info.webon.discover')
        .filter(webon => {
            return filterWebOnsByPlatform(webon, platform)
        });

    console.log('Filtered List:', JSON.stringify(filteredList, null, 2));

    return Promise.resolve(filteredList);
};

export function revertReverseDomain(reverseDomain) {
    const components = reverseDomain.split('.').reverse();
    return components.join('.');
}




export const fetchTagsList = async () => {
    const tags = await getData('tags/en');
    return Promise.resolve(tags);
};





const updateWebonInList = (id, isDownloaded) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedWebonList = get(data).webonList.map(webon => {
                if (webon.id === id) {
                    return { ...webon, downloaded: isDownloaded };
                }
                return webon;
            });

            const updatedFilteredList = get(data).filteredList.map(webon => {
                if (webon.id === id) {
                    return { ...webon, downloaded: isDownloaded };
                }
                return webon;
            });

            get(data).webonList = updatedWebonList;
            get(data).filteredList = updatedFilteredList;

            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

export const downloadWebOn = ({ id, domain }) => {
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
            await updateWebonInList(id, true);
            resolve();
        }).catch((e) => {
            console.error("Error during installation:", e);
            reject(e);
        });
    });
};

export const uninstallWebOn = ({ id, name }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const installedWebons = (await nomo.getInstalledWebOns()).manifests;
            const webon = installedWebons.find(webon => webon.webon_id === id || webon.webon_name === name);
            nomo.uninstallWebOn({
                webon_url: webon.webon_url
            }).then(async () => {
                await updateWebonInList(id, false);
                resolve();
            }).catch((e) => {
                console.error("Error during uninstallation:", JSON.stringify(e, null, 2));
                reject(e);
            });
        } catch (e) {
            console.log("Error:", e);
            reject("Please uninstall manually on your Homescreen");
        }
    });
};

export const formatAddNumber = (num) => {
    num = parseInt(num);
    if (num < 1000) return num.toString();
    return `${Math.round(num / 1000)}k+`;
};

export function copyToClipboard(text) {
    if (!text) {
        alert('Nothing to copy');
        return;
    }

    if (navigator.clipboard) {
        try {
            navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Copy failed:', err);
            alert('Copy to clipboard failed. Try manually copying.');
        }
    } else {
        const textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.value = text;
        textArea.focus();
        textArea.select();
        try {
            if (document.execCommand('copy')) {
                return true;
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Unable to copy. Please try manually.');
        } finally {
            document.body.removeChild(textArea);
        }
    }
    return false;
}

let previousFilters = {};
export const filterSortSearch = async () => {
    if (previousFilters?.tag !== get(filters).tag) {
        await filterWebonList(get(filters).tag);
    }
    if (previousFilters?.search !== get(filters).search) {
        await searchWebonList(get(filters).search);
    }
    if (previousFilters?.sortBy !== get(filters).sortBy) {
        await sortWebonList(get(filters).sortBy);
    }
    if (previousFilters?.platform !== get(filters).platform) {
        await fetchWebonList();
    }
    previousFilters = { ...get(filters) };
};

export const sortWebonList = async (sortBy) => {
    console.log('sortWebonList called with sortBy:', sortBy);
    get(data).filteredList = get(data).filteredList.sort((a, b) => {
    if (sortBy === 'newest') {
            const dateA = a.listed_at ? new Date(a.listed_at) : new Date(0);
            const dateB = b.listed_at ? new Date(b.listed_at) : new Date(0);
            return dateB - dateA;
        }
    else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
    else if (sortBy === 'popularity') {
            return b?.metrics.adds - a?.metrics.adds;
        }
    });
    return Promise.resolve();
};

export const searchWebonList = async (search) => {
    if (search === '') {
        await filterWebonList(get(filters).tag);
    } else {
        const sourceList = get(filters).tag ? get(data).filteredList : get(data).webonList;
        get(data).filteredList = sourceList.filter(webon => {
            const matchesSearchQuery = webon.name.toLowerCase().includes(search.toLowerCase());
            const tagMatchesSearchQuery = webon.tags?.some(tag => tag.name.toLowerCase().includes(search.toLowerCase()));
            const sloganMatchesSearchQuery = webon.slogan?.toLowerCase().includes(search.toLowerCase());
            const domainMatchesSearchQuery = webon.domain?.toLowerCase().includes(search.toLowerCase());
            return (matchesSearchQuery || tagMatchesSearchQuery || sloganMatchesSearchQuery || domainMatchesSearchQuery);
        });
    }
    return Promise.resolve();
};

export const filterWebonList = async (tag) => {
    if (!tag) {
        get(data).filteredList = get(data).webonList;
        return Promise.resolve();
    }
    get(data).filteredList = get(data).webonList.filter(webon => {
        return webon.tags.some(t => t.name === tag.name);
    });
    return Promise.resolve();
};

