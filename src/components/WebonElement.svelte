<script>
    import default_icon from '../assets/icon.png'
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {nomo} from "nomo-webon-kit";
    import Download from "./Icons/Download.svelte";
    import {onMount} from "svelte";
    import {hasMinimumNomoVersion} from "nomo-webon-kit/dist/nomo_api";

    export let webon
    const {name, id, icon, slogan, download_link} = webon
    export let downloaded = false

    onMount(() => {


    })
</script>

<div class="container" on:click={() => {
    browser && goto('/webon?id=' + id)
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
    {#if !downloaded}
        <button on:click={async e => {
        e.stopPropagation()
        const version_above = await hasMinimumNomoVersion({minVersion: '0.3.3'})
        if (version_above?.minVersionFulfilled) {
            nomo.installWebOn({
                deeplink: download_link,
                skipPermissionDialog: true,
                navigateBack: true,
              }).catch((e) => {
                console.error(e);
              }) ;
        } else {
            nomo.injectQRCode({qrCode: download_link, navigateBack: false})
        }
    }}>
                <Download/>
        </button>
    {/if}
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