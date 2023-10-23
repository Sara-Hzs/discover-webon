<script>
    import './global.scss';
    import {onMount} from "svelte";
    import {nomo} from "nomo-plugin-kit/dist/nomo_api";
    import {injectNomoCSSVariables} from "nomo-plugin-kit/dist/nomo_theming";
    import {data} from "../stores/data.js";
    import Reload from "../components/Reload.svelte";
    import {fetchWebonList} from "../utils/functions.js";
    import cross from "../assets/cross.svg";

    let loading = true
    let error = false

    onMount(async () => {
        await injectNomoCSSVariables();
        await nomo.registerOnPluginVisible(() => {
            refetchDataOnPluginVisible()
        })
        fetchWebonList().then(webonList => {
            $data.webonList = webonList
            loading = false
        }).catch(e => {
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
