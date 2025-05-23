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
    import { beforeNavigate, afterNavigate } from '$app/navigation';

    let scrollPositions = {};
    let loading = true;
    let error = false;



    beforeNavigate(({ from }) => {
        if (from) {
            const key = from.url.pathname + from.url.search;
            const positions = {
                page: document.documentElement.scrollTop || document.body.scrollTop || window.scrollY,
                folders: {}
            };

            // Save folder positions
            document.querySelectorAll('[data-folder-content]').forEach(folder => {
                const folderId = folder.getAttribute('data-folder-content');
                positions.folders[folderId] = folder.scrollTop;
            });

            scrollPositions[key] = positions;
            console.log(`Saved positions for ${key}:`, positions);
        }
    });

    afterNavigate(({ to }) => {
        if (to) {
            const key = to.url.pathname + to.url.search;
            const savedPositions = scrollPositions[key];

            const restoreScrolls = () => {
                if (savedPositions) {
                    // Restore page scroll
                    window.scrollTo(0, savedPositions.page);
                    document.documentElement.scrollTop = savedPositions.page;
                    document.body.scrollTop = savedPositions.page;

                    // Restore folder scrolls
                    document.querySelectorAll('[data-folder-content]').forEach(folder => {
                        const folderId = folder.getAttribute('data-folder-content');
                        if (savedPositions.folders[folderId] !== undefined) {
                            folder.scrollTop = savedPositions.folders[folderId];
                        }
                    });
                }
            };

            // Multiple restore attempts to ensure it works
            requestAnimationFrame(restoreScrolls);
            setTimeout(restoreScrolls, 50);
            setTimeout(restoreScrolls, 150);
        }
    });
    onMount(async () => {
        try {
            if (location.hostname.includes("discover.nomo.zone") || location.hostname.includes("discover.nomo.app")) {
                await nomo.migrateAndSelfDestroy({ new_deeplink: "https://nomo.app/webon/discover.webon.info" });
                return;
            }

            $nomo_store.install_functionality = (await hasMinimumNomoVersion({ minVersion: '0.3.3' }))?.minVersionFulfilled;
            $nomo_store.uninstall_functionality = (await hasMinimumNomoVersion({ minVersion: '0.3.4' }))?.minVersionFulfilled;
            $nomo_store.metamask_functionality = (await hasMinimumNomoVersion({ minVersion: '0.4.0' }))?.minVersionFulfilled;

            const modeInfo = await nomo.getExecutionMode();
            const executionMode = modeInfo?.executionMode || 'DESKTOP';
            console.log('Execution Mode Info:', modeInfo);
            console.log('Determined Execution Mode:', executionMode);
            $filters.platform = executionMode


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
            await sortWebonList('newest');
        } catch (e) {
            console.error('Error in onMount:', e);
            error = true;
        }
        loading = false;
    });

    const refetchDataOnWebonVisible = async () => {
        $filters.sortBy = 'newest';
        $filters.search = '';

        loading = true
        await fetchWebonList().then(async webonList => {
            $data.webonList = webonList;
            $data.filteredList = webonList;
            await mergeInstalledList();
            await sortWebonList($filters.sortBy)

        }).catch(e => {
            console.error('Error refetching WebOn list:', e);
            $data.webonList = $data.webonList;
        });
        loading = false
    };

    $: if ($filters) {
        filterSortSearch();
        $data.filteredList = $data.filteredList;
    }
</script>

<svelte:head>
    <title>Discover WebOns</title>
    <meta name="description" content="Discover WebOns" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
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