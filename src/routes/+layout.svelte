<script>
    import './global.scss';
    import { onMount } from "svelte";
    import { data } from "../stores/data.js";
    import { nomo_store } from "../stores/nomo_store.js";
    import { filters } from "../stores/filters.js";
    import Reload from "../components/Reload.svelte";
    import { fetchTagsList, fetchWebonList } from "../utils/functions.js";
    import cross from "../assets/cross.svg";
    import { nomo } from "nomo-webon-kit";
    import { hasMinimumNomoVersion } from "nomo-webon-kit";
    import { mergeInstalledList, sortWebonList, filterSortSearch } from "../utils/functions.js";

    let loading = true;
    let error = false;

    onMount(async () => {
        try {
            if (location.hostname.includes("nomo")) {
                await nomo.migrateAndSelfDestroy({ new_deeplink: "https://nomo.app/webon/discover.webon.info" });
            }

            $nomo_store.install_functionality = (await hasMinimumNomoVersion({ minVersion: '0.3.3' }))?.minVersionFulfilled;
            $nomo_store.uninstall_functionality = (await hasMinimumNomoVersion({ minVersion: '0.3.4' }))?.minVersionFulfilled;
            $nomo_store.metamask_functionality = (await hasMinimumNomoVersion({ minVersion: '0.4.0' }))?.minVersionFulfilled;

            const executionMode = (await nomo.getExecutionMode())?.executionMode;
            $data.isBrowser = executionMode === 'FALLBACK';

            $filters.platform = executionMode;

            await nomo.registerOnWebOnVisible(() => {
                refetchDataOnWebonVisible();
            });

            await fetchWebonList().then(async webonList => {
                $data.webonList = webonList;
                $data.filteredList = webonList;
                await mergeInstalledList();
            }).catch(e => {
                console.error('Error fetching WebOn list:', e);
                $data.webonList = [];
                $data.filteredList = [];
                error = true;
            });
            await fetchTagsList().then(tagsList => {
                $data.tagsList = tagsList;
            }).catch(e => {
                console.error('Error fetching tags list:', e);
                $data.tagsList = [];
            });
            await sortWebonList('popularity');
        } catch (e) {
            console.error('Error in onMount:', e);
            error = true;
        }
        loading = false;
    });

    const refetchDataOnWebonVisible = async () => {
        await fetchWebonList().then(async webonList => {
            $data.webonList = webonList;
            $data.filteredList = webonList;
            await mergeInstalledList();
        }).catch(e => {
            console.error('Error refetching WebOn list:', e);
            $data.webonList = $data.webonList;
        });
    };

    $: if ($filters) {
        filterSortSearch();
        $data.filteredList = $data.filteredList;
    }
</script>

<svelte:head>
    <title>Discover WebOns</title>
    <meta name="description" content="Discover WebOns" />
</svelte:head>

{#if loading}
    <div class="loading">
        <div class="spinner"></div>
    </div>
{:else}
    {#if error}
        <div class="error">
            <img src={cross} alt="Error icon">
            <div>Error occurred while loading</div>
            <Reload />
        </div>
    {:else}
        <slot />
    {/if}
{/if}

<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .spinner {
        border: 5px solid #2af4fd;
        border-top: 5px solid #ed56c6;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 3s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>