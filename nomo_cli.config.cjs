const nomoCliConfig = {
    deployTargets: {
        production: {
            rawSSH: {
                sshHost: "root@95.179.247.2",
                sshBaseDir: "/var/www/production_webons/discovery/",
                publicBaseUrl: "https://w.nomo.app/discovery",
            },
        },
        qa: {
            rawSSH: {
                sshHost: "root@95.179.247.2",
                sshBaseDir: "/var/www/qa_webons/qa-discovery/",
                publicBaseUrl: "https://testing.nomo.app/qa-discovery",
            },
        },
    },
};

module.exports = nomoCliConfig;