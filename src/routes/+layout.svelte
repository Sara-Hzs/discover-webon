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
    import {fetchWebonList} from "../utils/functions.js";
    import cross from "../assets/cross.svg";
    import {nomo} from "nomo-webon-kit";
    import {hasMinimumNomoVersion} from "nomo-webon-kit";

    let loading = true
    let error = false

    onMount(async () => {
        if (location.hostname.includes("store")) {
            // get rid of the old store because it is both outdated and non-compliant with Apple guidelines
            await nomo.migrateAndSelfDestroy({new_deeplink: "https://nomo.app/webon/discover.nomo.app"})
        }
        $nomo_store.install_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.3'}))?.minVersionFulfilled
        $nomo_store.uninstall_functionality = (await hasMinimumNomoVersion({minVersion: '0.3.4'}))?.minVersionFulfilled
        await injectNomoCSSVariables();
        try {
            await nomo.registerOnWebOnVisible(() => {
                refetchDataOnPluginVisible()
            })
        } catch (e) {
            console.log(e)
        }
        await fetchWebonList().then(webonList => {
            $data.webonList = webonList
        }).catch(e => {
            error = JSON.stringify(e)
            $data.webonList = []
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