<script>
    import default_icon from '../assets/icon.png'
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Download from "./Icons/Download.svelte";
    import Uninstall from "./Icons/Uninstall.svelte";
    import Checkmark from "./Icons/Checkmark.svelte";
    import {downloadWebOn, image, uninstallWebOn} from "../utils/functions.js";
    import {nomo_store} from "../stores/nomo_store.js";
    import {onMount} from "svelte";

    export let webon
    let loading = true
    let error = ''

    onMount(() => {
        webon = webon
        loading = false
    })
</script>

{#if !loading}

    <div class="container" on:click={() => {
browser && goto('/webon?id=' + webon.webon_id)
}}>
        <div class="icon">
            {#if image(webon.icon)}
                <img src={image(webon.icon)} alt=''/>
            {:else}
                <img src={default_icon} alt=''/>
            {/if}
        </div>
        <div class="information">
            <div class="name">
                {webon.name}
            </div>
            <div class="slogan">
                {webon.slogan}
            </div>
        </div>
        {#if !webon.downloaded}
            <button on:click={async e => {
            e.stopPropagation()
            downloadWebOn(webon.download_link).then(() => {
                error = ''
                webon.downloaded = true
            }).catch(() => {
                error = 'Download failed'
            })
            }}>
                <Download/>
            </button>
        {:else if $nomo_store.uninstall_functionality}
            <button on:click={async e => {
            e.stopPropagation()
            uninstallWebOn(webon.download_link === 'https://nomo.app/webon/w.nomo.app/demowebon/nomo.tar.gz' ? 'https://w.nomo.app/demowebon/nomo.tar.gz' : webon.download_link).then(() => {
                error = ''
                webon.downloaded = false
            }).catch(e => {
            error = 'Uninstall failed: ' + JSON.stringify(e)
            })
    }}>
                <Uninstall/>
            </button>
        {:else}
            <button disabled>
                <Checkmark/>
            </button>
        {/if}
    </div>
{/if}
{#if error}
    <div class="error">{error}</div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

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

  .error {
    color: red;
    font-size: 12px;
    margin: 5px 5px 15px;
    padding: 5px;
  }
</style>