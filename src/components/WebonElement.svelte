<script>
    import default_icon from '../assets/icon.png'
    import {browser} from "$app/environment";
    import {data} from "../stores/data.js";
    import {goto} from "$app/navigation";
    import Download from "./Icons/Download.svelte";
    import Uninstall from "./Icons/Uninstall.svelte";
    import Checkmark from "./Icons/Checkmark.svelte";
    import {downloadWebOn, uninstallWebOn} from "../utils/functions.js";
    import {nomo_store} from "../stores/nomo_store.js";
    import {onMount} from "svelte";


    export let webon
    let loading = true
    let error = ''

    onMount(() => {
        webon = webon
        loading = false
    })
    // Helper function to format numbers (e.g., 1354 becomes 1k+)
    function formatNumber(num) {
        if (num < 1000) return num; // return the number directly if less than 1000
        if (num >= 1000) return `${Math.round(num / 1000)}k+`; // convert to 'k+' notation for thousands
    }
</script>

{#if !loading}
    <div class="container" on:click={() => browser && goto('/webon?id=' + webon.id)}>
        <div class="card-image">
            {#if webon.icon}
                <img src={webon.card} alt="{webon.name}"/>
            {:else}
                <img src={default_icon} alt="Default icon"/>
            {/if}
        </div>
        <div class="card-content">
            <div class="icon">
                {#if webon.icon}
                    <img src={webon.icon} alt="{webon.name}"/>
                {:else}
                    <img src={default_icon} alt="Default icon"/>
                {/if}
            </div>
            <div class="details">
            <div class="name">{webon.name}</div>
            <div class="slogan">{webon.slogan}</div>
            <div class="domain">https://{webon.domain}</div>
        </div>
            <div class="metrics">
                Installs: {formatNumber(webon.metrics.installs)}
            </div>
    </div>
        {#if $data.isBrowser}

            <button disabled>
                <Download/>
            </button>
        {:else if !webon.downloaded}
            <button on:click={async e => {
        e.stopPropagation()
        downloadWebOn(webon.domain).then(() => {
            error = ''
            webon.downloaded = true
        }).catch((e) => {
            error = e?.toString() ?? 'Download failed'
        })
        }}>
                <Download/>
            </button>

        {:else if $nomo_store.uninstall_functionality}
            <button on:click={async e => {
    e.stopPropagation();
    if (webon.domain) {
        const uninstallUrl = webon.domain === 'https://nomo.app/webon/w.nomo.app/demowebon/nomo.tar.gz'
            ? 'https://w.nomo.app/demowebon/nomo.tar.gz'
            : webon.domain;
        console.log("Attempting to uninstall with URL:", uninstallUrl);
        uninstallWebOn(uninstallUrl).then(() => {
            error = '';
            webon.downloaded = false;
        }).catch(e => {
            error = 'Uninstall failed: ' + JSON.stringify(e);
        });
    } else {
        error = 'Invalid URL for uninstallation';
    }
}}>
                <Uninstall/>
            </button>
        {:else}
            <button disabled>
                <Checkmark/>
            </button>
        {/if}
    </div>
{/if}
{#if error}
    <div class="error">{error}</div>
{/if}
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }

    .container:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    .card-image {
        width: 100%;
        height: 220px;
        overflow: hidden;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }


    .card-content {
        padding: 10px;
        text-align: left;
        width: 100%;
    }

    .icon {
        width: 40px;
        padding-bottom: 10px;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .name,
    .slogan,
    .domain {
        margin-bottom: 5px;
        margin-left: 5px;
    }



    .error {
        color: red;
        font-size: 12px;
        margin: 5px 5px 15px;
        padding: 5px;
    }

</style>