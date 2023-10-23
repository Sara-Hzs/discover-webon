<script>

import {data} from "../stores/data.js";
import WebonElement from "./WebonElement.svelte";
</script>

<div class="container">
    {#each $data.webonList as webon}
        <WebonElement {...webon} />
    {/each}
</div>

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