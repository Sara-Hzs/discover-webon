
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
    import {isFallbackModeActive} from "nomo-webon-kit";



    export let webon
    let loading = true
    let error = ''
    export let isInCategorizedView = false;

    function formatUrl(url) {
        if (!url.startsWith('http')) {
            url = 'https://' + webon.domain + url;
        }
        return url;
    }

    onMount(() => {
        webon = webon;
        // webon.downloaded = getDownloadStatus(webon.id);
        loading = false;


        if (webon.card) {
            webon.card = formatUrl(webon.card);
            console.log('Formatted card URL:', webon.card);
        }
        if (webon.icon) {
            webon.icon = formatUrl(webon.icon);
            console.log('Formatted icon URL:', webon.icon);
        }
    });


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
        if (isFallbackModeActive()) {
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
                    <div class="text-container">
                        <div class="name">{webon.name}</div>
                        <a href="https://{webon.domain}" class="domain" on:click|preventDefault={navigateToDetailPage}>https://{webon.domain}</a>
                    </div>

                </div>
                <div class="download" class:categorized-download={isInCategorizedView}>
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
    background: #333333;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: relative;
    margin-bottom: 0;
    transition: transform 0.4s ease;
    min-height: 90px;
    overflow: hidden;
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
    pointer-events: none;
    user-select: none;
  }

  .card-content {
    padding: 18px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
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
    flex-shrink: 0;
    width: 40px;
    height: 40px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .left {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }


  .text-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: calc(100% - 40px);
  }


  .name {
    font-size: 16px;
    font-weight: bold;

    line-height: 1.3;
    margin-bottom: 2px;
  }

  .domain {
    font-size: 14px;
    color: #aaa;
    text-decoration: none;
    line-height: 1.3;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .slogan {
    font-size: 13px;
    color: #ddd;
    padding-bottom: 10px;
    margin-top: 8px;
    line-height: 1.4;
    white-space: normal;
    overflow: visible;
    word-wrap: break-word;
  }

  .download {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: transparent;
      border: none;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      width: 38px;
      height: 38px;
    }
  }

  .categorized-download {
    position: absolute;
    right: 8px;
    bottom: 8px;

    button {
      width: 30px;
      height: 30px;
      padding: 4px;
    }
  }
  .error {
    color: red;
    font-size: 12px;
    margin: 5px 5px 15px;
    padding: 5px;
  }
  @media (max-width: 768px){
    .card-image{
      display: none;
    }
  }
  @media (max-width: 425px) {
    .container {
      min-height: 80px;
    }

    .card-content {
      padding: 20px;
    }
    .card-image{
      display: none;
    }

    .icon {
      width: 40px;
      height: 40px;
    }


    .domain {
      font-size: 12px;
    }

    .slogan {
      font-size: 14px;
      margin-top: 10px;
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: break-word;
      max-width: 90%;
    }

    .download {
      bottom: auto;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);

    }
    .download button {
      width: 36px;
    }

  }
</style>