const nomoCliConfig = {
    deployTargets: {
        production: {
            rawSSH: {
                sshHost: "root@188.34.178.77",
                sshBaseDir: "/var/www/production_webons/discover/",
                publicBaseUrl: "https://discover.webon.info",
            },
        },
    },
};

module.exports = nomoCliConfig;