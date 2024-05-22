<script>
    import default_icon from '../assets/icon.png'
    import {browser} from "$app/environment";
    import {data} from "../stores/data.js";
    import {goto} from "$app/navigation";
    import Download from "./Icons/Download.svelte";
    import Uninstall from "./Icons/Uninstall.svelte";
    import Checkmark from "./Icons/Checkmark.svelte";
    import {downloadWebOn, uninstallWebOn} from "../utils/functions.js";
    import {onMount} from "svelte";


    export let webon
    let loading = true
    let error = ''

    onMount(() => {
        webon = webon
        loading = false

    })
    async function handleUninstall() {
        try {
            await uninstallWebOn(webon);
            webon.downloaded = false;
            error = '';
        } catch (err) {
            console.error("Uninstall failed:", JSON.stringify(err, null, 2));
            error = err.toString();
        }
    }

    async function handleDownload(e) {
        e.stopPropagation();
        try {
            await downloadWebOn(webon);
            error = '';
            webon.downloaded = true;
        } catch (e) {
            error = e?.toString() ?? 'Download failed';
        }
    }

    function handleButtonClick(e) {
        e.stopPropagation();
        if (browser && window.innerWidth >= 768) {
            goto('/webon?id=' + webon.id);
        } else {
            handleDownload(e);
        }
    }
    function navigateToDetailPage(e) {
        e.preventDefault();
        goto('/webon?id=' + webon.id);
    }

</script>

{#if !loading}
    <div class="container" on:click={() => browser && goto('/webon?id=' + webon.id)}>
        <div class="card-image">
            {#if webon.card}
                <img src={webon.card} alt="{webon.name}"/>
            {:else}
                <img src={default_icon} alt="Default icon"/>
            {/if}
        </div>
        <div class="card-content">
            <div class="icon-container">
                <div class="left">
                    <div class="icon">
                        {#if webon.icon}
                            <img src={webon.icon} alt="{webon.name}"/>
                        {:else}
                            <img src={default_icon} alt="Default icon"/>
                        {/if}
                    </div>
                    <div>
                        <div class="name">{webon.name}</div>
                        <a href="https://{webon.domain}" class="domain" on:click|preventDefault={navigateToDetailPage}>https://{webon.domain}</a>
                    </div>

                </div>
                <div class="download">
                    {#if $data.isBrowser}
                        <button on:click={handleButtonClick}>
                            <Download />
                        </button>
                    {:else if !webon.downloaded}
                        <button on:click={handleButtonClick}>
                            <Download />
                        </button>
                    {:else if webon.downloaded}
                        <button on:click={async e => {
                            e.stopPropagation();
                            await handleUninstall();
                        }} class="uninstall-btn">
                            <Uninstall />
                        </button>
                    {:else}
                        <button disabled>
                            <Checkmark />
                        </button>
                    {/if}
                </div>
            </div>
            <div class="details">

                <div class="slogan">{webon.slogan}</div>

            </div>

        </div>
    </div>
{/if}
{#if error}
    <div class="error">{error}</div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #333333;
    width: 100%;
    border-radius: 8px;
    position: relative;
    margin-bottom: 10px;
    transition: transform 0.4s ease;
  }

  .container:hover {
    transform: translateY(-4px);
  }

  .card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

  }

  .card-image img {
    width: 100%;
    object-fit: cover;
  }


  .card-content {
    padding: 10px;
    text-align: left;
    width: 100%;
    cursor: pointer;
  }

  .icon-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: clamp(18px, 3vw, 20px);
    font-weight: bold;
    gap: 10px;
  }

  .icon {
    width: 60px;
    padding-bottom: 10px;
    overflow: hidden;

    img {
      border-radius: 5px;
    }
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .name,
  .slogan {
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .name {
    font-size: clamp(15px, 3vw, 18px);
  }

  .domain {
    font-size: 14px;
    text-decoration: none;
    margin-left: 5px;
    font-weight: normal;
  }



  .slogan {
    width: 70%;
    margin-top: 10px;
  }

  .download {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 5px;
  }

  .error {
    color: red;
    font-size: 12px;
    margin: 5px 5px 15px;
    padding: 5px;
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      background: none;
      isolation: isolate;
      background: #333333;
      padding: 10px;
      padding-right: 50px;
    }

    .card-image {
      z-index: -1;
      position: absolute;
      inset: 0 0 0 0;

      img {
        opacity: 0.03;
        transform: translateY(-8px);
      }
    }

    .card-content {
      flex-grow: 1;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }


    .download {
      position: absolute;
     top: 10px;
      right: 20px;
      padding: 5px;
    }
    .download button {
      padding: 2px 1px;
      font-size: 0.8em;
      margin: 5px 0;
    }
    .name,
    .slogan {
      text-align: left;
      font-size: 0.8em;
    }


    .domain {
      text-align: left;
      font-size: 0.7em;

    }

    .slogan {
      font-size: 0.8em;
      opacity: 0.9;
      width: 100%;

    }


  }
</style>