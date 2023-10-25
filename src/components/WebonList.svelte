<script>

import {data} from "../stores/data.js";
import WebonElement from "./WebonElement.svelte";
// import {nomo} from "nomo-plugin-kit/dist/nomo_api";

export let suggested = false
</script>

<div class="container">
    {#each $data.webonList as webon}
        <WebonElement {...webon} {suggested}/>
    {/each}
<!--    <button on:click={() => {-->
<!--        $data.webonList.forEach(webon => {-->
<!--            nomo.injectQRCode({qrCode: webon.download_link, navigateBack: true})-->
<!--        })-->
<!--    }}>Install all</button>-->
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
  button {
    width: 100%;
    height: 50px;
    background-color: #2ecc71;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
</style>