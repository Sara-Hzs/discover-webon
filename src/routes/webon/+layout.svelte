<script>
    import {onMount} from "svelte";
    import {data} from "../../stores/data.js";
    import cross from "../../assets/cross.svg";
    import Reload from "../../components/Reload.svelte";
    import {nomo} from "nomo-webon-kit";
    import {getData, revertReverseDomain} from "../../utils/functions.js";

    let id
    let webon
    let loading = true
    let error = false

    function getParameterFromURL() {
        const url = new URL(window.location.href)
        id = url.searchParams.get('id');
    }

    const getWebonById = async (id) => {
        webon = $data.webonList.find(el => {
            return el.id === id
        })
        if(webon) {
            $data[id] = webon
            loading = false
        } else {
            try {
                webon = await getData('webon/' + revertReverseDomain(id))
                console.log(data)
                $data[id] = webon
            } catch (e) {
                error = "Webon not found"
                loading = false
            }
            loading = false
        }
    }

    onMount(async () => {
        getParameterFromURL();
        await getWebonById(id)
        try {
            await nomo.registerOnWebOnVisible(async () => {
                getParameterFromURL();
                await getWebonById(id)
            })
        } catch (e) {
            console.error(e)
        }
    })


</script>

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