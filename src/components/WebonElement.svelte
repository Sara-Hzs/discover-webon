<script>
    // import download from '../assets/download.svg'
    import default_icon from '../assets/icon.png'
    // import checkmark from '../assets/checkmark_black.svg'
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {nomo} from "nomo-plugin-kit/dist/nomo_api";
    import Download from "./Icons/Download.svelte";

    export let name
    export let id
    export let icon
    export let slogan
    export let download_link
    export let description
    export let version
    export let card_image
    export let images
    export let downloaded = false

    export let suggested = false
</script>

<div class="container" on:click={() => {
    browser && goto('/webon?id=' + id)
    suggested && setTimeout(() => {
        location.reload()
    }, 50)
}}>
    <div class="icon">
        {#if icon}
            <img src={icon} alt=''/>
        {:else}
            <img src={default_icon} alt=''/>
        {/if}
    </div>
    <div class="information">
        <div class="name">
            {name}
        </div>
        <div class="slogan">
            {slogan}
        </div>
    </div>
    <button on:click={e => {
        e.stopPropagation()
        nomo.injectQRCode({qrCode: download_link, navigateBack: true})
    }}>
<!--        <img src={downloaded ? checkmark : download} alt="">-->
        <Download/>
    </button>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    .icon {
      img {
        border-radius: 12px;
        height: 60px;
      }
    }

    .information {
      padding: 3px;
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      .name {
        font-size: 14px;
        letter-spacing: 0.5px;
        color: var(--nomoForeground1);
      }

      .slogan {
        font-size: 12px;
        filter: brightness(0.7);
        color: var(--nomoForeground2);
      }
    }

    button {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;

      img {
        height: 30px;
        border-radius: 1000px;
      }
    }
  }
</style>