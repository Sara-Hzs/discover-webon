export const platformVisibility = {

    qr: {
        mobile: (inNomo) => !inNomo,
        desktop: (inNomo) => !inNomo,
        hub: false,
    },
        downloadButton: {
            mobile: (inNomo) => inNomo,
            desktop: (inNomo) => inNomo,
            hub: true,
        },

    androidDownloadLink: {
        hub: false,
        desktop: (inNomo) => inNomo,
        mobile: (inNomo, isAndroid) => !inNomo && isAndroid,
    },
    iosDownloadLink: {
        hub: false,
        desktop: (inNomo) => inNomo,
        mobile: (inNomo, isIOS) => !inNomo && isIOS,
    },
    websiteLink: {
        mobile: (inNomo) => !inNomo,
        desktop: (inNomo) => !inNomo,
        hub: false,
    },
};