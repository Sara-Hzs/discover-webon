<script>
    import './global.scss';
    import {onMount} from "svelte";
    import {
        getCurrentNomoTheme,
        // getCurrentNomoTheme,
        injectNomoCSSVariables,
        // switchNomoTheme
    } from "nomo-webon-kit";
    import {data} from "../stores/data.js";
    import Reload from "../components/Reload.svelte";
    import {fetchWebonList} from "../utils/functions.js";
    import cross from "../assets/cross.svg";
    import {nomo} from "nomo-webon-kit";

    let loading = true
    let error = false

    let webons = []

    onMount(async () => {
        const theme = await getCurrentNomoTheme()
        console.log(theme);
        if(theme.name !== "LIGHT") {
            await injectNomoCSSVariables();
        }
        try {
            await nomo.registerOnWebOnVisible(() => {
                refetchDataOnPluginVisible()
            })
        } catch (e) {
            console.log(e)
        }
        // await nomo.registerOnPluginVisible(() => {
        //     refetchDataOnPluginVisible()
        // })
        nomo.getInstalledWebOns().then(installed_webons => {
            webons = installed_webons
        })
        fetchWebonList().then(webonList => {
            $data.webonList = webonList
            loading = false
        }).catch(e => {
            console.log(e)
            error = e.message
            loading = false
        })
    })

    const refetchDataOnPluginVisible = async () => {
        $data.webonList = await fetchWebonList().catch(e => {
            console.log(e)
        })
    }

</script>

<svelte:head>
    <title>Webon Store</title>
    <meta name="description" content="Webon Store"/>
</svelte:head>

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
