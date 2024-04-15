<script>
    import './global.scss';
    import {onMount} from "svelte";
    import {
        // getCurrentNomoTheme,
        injectNomoCSSVariables,
        // switchNomoTheme
    } from "nomo-webon-kit";
    import {data} from "../stores/data.js";
    import {nomo_store} from "../stores/nomo_store.js";
    import Reload from "../components/Reload.svelte";
    import {fetchTagsList, fetchWebonList} from "../utils/functions.js";
    import cross from "../assets/cross.svg";
    import {nomo} from "nomo-webon-kit";
    import {hasMinimumNomoVersion} from "nomo-webon-kit";

    let loading = true
    let error = false

    onMount(async () => {
        if (location.hostname.includes("")) {
            try {
                await nomo.migrateAndSelfDestroy({new_deeplink: ""});

            } catch (e) {
                console.error('Migration failed:', e);

            }
        }
        $nomo_store.install_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.3'}))?.minVersionFulfilled
        $nomo_store.uninstall_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.4'}))?.minVersionFulfilled
        $nomo_store.metamask_functionality = (await hasMinimumNomoVersion({minVersion: '0.4.0'}))?.minVersionFulfilled
        await injectNomoCSSVariables();
        $data.isBrowser = (await nomo.getExecutionMode())?.executionMode === 'FALLBACK'
        try {
            await nomo.registerOnWebOnVisible(() => {
                refetchDataOnPluginVisible()
            })
        } catch (e) {
            console.log(e)
        }
        await fetchWebonList().then(webonList => {
            $data.webonList = webonList
            $data.filteredList = webonList
        }).catch(e => {
            console.log(e)
            $data.webonList = []
            $data.filteredList = []
        })
        await fetchTagsList().then(tagsList => {
            $data.tagsList = tagsList
        }).catch(e => {
            console.log(e)
            $data.tagsList = []
        })
        loading = false
    })
    const refetchDataOnPluginVisible = async () => {
        await fetchWebonList().then(webonList => {
            $data.webonList = webonList
        }).catch(e => {
            console.log(e)
            $data.webonList = $data.webonList
        })
    }

</script>

<svelte:head>
    <title>Discover WebOns</title>
    <meta name="description" content="Discover WebOns"/>
</svelte:head>

{#if loading}
    <div class="loading">
        Loading...
    </div>
{:else}
    {#if error}
        <div class="error">
            <img src={cross} alt="">
            <div>{error}</div>
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