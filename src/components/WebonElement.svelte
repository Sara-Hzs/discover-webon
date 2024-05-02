<script>
    import default_icon from '../assets/icon.png'
    import {browser} from "$app/environment";
    import {data} from "../stores/data.js";
    import {goto} from "$app/navigation";
    import Download from "./Icons/Download.svelte";
    import Uninstall from "./Icons/Uninstall.svelte";
    import Checkmark from "./Icons/Checkmark.svelte";
    import {downloadWebOn, uninstallWebOn} from "../utils/functions.js";
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
    <div class="cards-grid">
        <div class="container" on:click={() => {
browser && goto('/webon?id=' + webon.id)
}}>
            <div class="card-header">

                <div class="icon">
                    {#if webon.icon}
                        <img src={webon.icon} alt=''/>
                    {:else}
                        <img src={default_icon} alt=''/>
                    {/if}
                </div>
            </div>
            <div class="card-body">
                <div class="name">{webon.name}</div>
                <div class="slogan">{webon.slogan}</div>
                <div class="domain">https://{webon.domain}</div>
            </div>
            <div class="card-footer">
                {#if $data.isBrowser}
                    <button disabled>
                        <Download/>
                    </button>
                {:else if !webon.downloaded}
                    <button on:click={async e => {
        e.stopPropagation();
        downloadWebOn(webon.download_link).then(() => {
            error = ''
            webon.downloaded = true
        }).catch((e) => {
            error = e?.toString() ?? 'Download failed'
        })
        }}>
                        <Download/>
                    </button>
                {:else if $nomo_store.uninstall_functionality}
                    <button on:click={async e => {
        e.stopPropagation();
        uninstallWebOn(webon.webon_url === 'https://nomo.app/webon/w.nomo.app/demowebon/nomo.tar.gz' ? 'https://w.nomo.app/demowebon/nomo.tar.gz' : webon.webon_url).then(() => {
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
        </div>
    </div>
{/if}
{#if error}
    <div class="error">{error}</div>
{/if}
<style lang="scss">
  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin: 5px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;


    &:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }


    .card-header {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
    }

    .icon {
      img {
        max-width: 100%;
        max-height: 100px;
        object-fit: contain;
      }
    }

    .card-body {
      padding: 10px;
      text-align: center;
      .title {
        font-size: 16px;
        color: var(--nomoForeground1);
      }
      .slogan, .domain {
        font-size: 14px;
        color: var(--nomoForeground2);
      }
    }


    .card-footer {
      padding: 10px;
      width: 100%;
      display: flex;
      justify-content: space-around;
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