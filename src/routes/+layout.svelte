<script>
    import './global.scss';
    import {onMount} from "svelte";
    import {
        getCurrentNomoTheme,
        injectNomoCSSVariables,
        // switchNomoTheme  // only if needed for theme switching
    } from "nomo-webon-kit";
    import {data} from "../stores/data.js";
    import {nomo_store} from "../stores/nomo_store.js";
    import Reload from "../components/Reload.svelte";
    import {fetchTagsList, fetchWebonList} from "../utils/functions.js";
    import cross from "../assets/cross.svg";
    import {nomo} from "nomo-webon-kit";
    import {hasMinimumNomoVersion} from "nomo-webon-kit";
    import {mergeInstalledList} from "../utils/functions.js";

    let loading = true;
    let error = false;
    let currentThemeDetails;

    onMount(async () => {
        try {
            // Check for and handle migrations if applicable
            if (location.hostname.includes("nomo")) {
                await nomo.migrateAndSelfDestroy({new_deeplink: "https://nomo.app/webon/discover.webon.info"});
            }
            // Inject theme CSS variables upon mounting
            await injectNomoCSSVariables();
            console.log("CSS variables injected based on the current Nomo theme.");

            // Optionally get current theme details
            currentThemeDetails = await getCurrentNomoTheme();
            console.log("Current Theme Details:", currentThemeDetails);

            // Handle other initializations and data fetching
            $nomo_store.install_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.3'}))?.minVersionFulfilled;
            $nomo_store.uninstall_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.4'}))?.minVersionFulfilled;
            $nomo_store.metamask_functionality = (await hasMinimumNomoVersion({minVersion: '0.4.0'}))?.minVersionFulfilled;

            $data.isBrowser = (await nomo.getExecutionMode())?.executionMode === 'FALLBACK';

            await nomo.registerOnWebOnVisible(() => {
                refetchDataOnPluginVisible();
            });

            await fetchWebonList().then(async webonList => {
                $data.webonList = webonList;
                $data.filteredList = webonList;
                await mergeInstalledList()
            }).catch(e => {
                console.error('Error fetching WebOn list:', e);
                $data.webonList = [];
                $data.filteredList = [];
            });

            await fetchTagsList().then(tagsList => {
                $data.tagsList = tagsList;
            }).catch(e => {
                console.error('Error fetching tags list:', e);
                $data.tagsList = [];
            });
        } catch (e) {
            console.error('Error in onMount:', e);
            error = true;
        }
        loading = false;
    });

    const refetchDataOnPluginVisible = async () => {
        await fetchWebonList().then(webonList => {
            $data.webonList = webonList;
        }).catch(e => {
            console.error('Error refetching WebOn list:', e);
            $data.webonList = $data.webonList; // Maintain previous list on error
        });
    }
</script>

<svelte:head>
    <title>Discover WebOns</title>
    <meta name="description" content="Discover WebOns"/>
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
            <Reload/>
        </div>
    {:else}
        <slot/>
    {/if}
{/if}
<!--<button on:click={async () => {-->
<!--         const oldTheme = (await getCurrentNomoTheme()).name;-->
<!--         const newTheme =-->
<!--             oldTheme === "LIGHT"-->
<!--                 ? "DARK"-->
<!--                 : oldTheme === "DARK"-->
<!--                     ? "TUPAN"-->
<!--                     : oldTheme === "TUPAN"-->
<!--                         ? "AVINOC"-->
<!--                         : "LIGHT";-->
<!--        await switchNomoTheme({ theme: newTheme });-->
<!--        await injectNomoCSSVariables(); // refresh css variables after switching theme-->
<!--}}>-->
<!--    Theme-->
<!--</button>-->


<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.7);
    }

    .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 6s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>