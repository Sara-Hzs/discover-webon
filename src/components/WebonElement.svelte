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
            <div class="name">{webon.name}</div>
            <div class="slogan">{webon.slogan}</div>
            <div class="domain">https://{webon.domain}</div>
        </div>
        <div class="card-actions">
            {#if $data.isBrowser}
                <button disabled><Download/></button>
            {:else if !webon.downloaded}
                <button on:click|stopPropagation={async () => {
                downloadWebOn(webon.download_link).then(() => {
                    error = '';
                    webon.downloaded = true;
                }).catch((e) => {
                    error = e?.toString() ?? 'Download failed';
                })
            }}><Download/></button>
            {:else if $nomo_store.uninstall_functionality}
                <button on:click|stopPropagation={async () => {
                uninstallWebOn(webon.webon_url === 'https://nomo.app/webon/w.nomo.app/demowebon/nomo.tar.gz'
                    ? 'https://w.nomo.app/demowebon/nomo.tar.gz'
                    : webon.webon_url).then(() => {
                        error = '';
                        webon.downloaded = false;
                    }).catch(e => {
                        error = 'Uninstall failed: ' + JSON.stringify(e);
                    })
            }}><Uninstall/></button>
            {:else}
                <button disabled><Checkmark/></button>
            {/if}
        </div>
    </div>
{/if}
{#if error}
    <div class="error">{error}</div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 10px;
        transition: box-shadow 0.3s ease;
        &:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
    }
    .card-image img {
        width: 100%;
        height: auto;
        max-height: 140px;
        max-width: 300px;
        object-fit: cover;
    }
    .card-content {
        padding: 10px;
        text-align: left;
    }
    .icon{
        width: 40px;
        padding-bottom: 10px;
    }
    .name, .slogan, .domain {
        margin-bottom: 5px;
    }
    .card-actions button {
        margin: 10px;
    }


    .error {
        color: red;
        font-size: 12px;
        margin: 5px 5px 15px;
        padding: 5px;
    }
</style>