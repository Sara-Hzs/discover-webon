<!-- WebonList.svelte -->

<script>
    import { onMount } from "svelte";
    import WebonElement from "./WebonElement.svelte";
    import { fetchWebonList } from "../utils/functions.js";

    let webons = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            webons = await fetchWebonList();
        } catch (e) {
            error = 'Failed to fetch webons: ' + e.message;
        }
        loading = false;
    });
</script>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <div class="container">
        {#each webons as webon}
            <WebonElement {webon}/>
        {/each}
    </div>
{/if}


<style lang="scss">
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
</style>