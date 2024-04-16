
<script>
    import {data} from "../../stores/data.js";
    import icon from "../../assets/icon.png"
    import card from "../../assets/card.png"
    import plus from "../../assets/plus.svg"
    import checkmark from "../../assets/checkmark.svg"
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Back from "../../components/Icons/Back.svelte";
    import QrCode from "svelte-qrcode"
    import {downloadWebOn} from "../../utils/functions.js";

    let id = getParameterFromURL()
    let webon = $data[id]

    function getParameterFromURL() {
        const url = new URL(window.location.href)
        return url.searchParams.get('id');
    }
    let showCopyNotification = false;

    function copyToClipboard() {
        navigator.clipboard.writeText("https://" + webon.domain).then(() => {
            showCopyNotification = true;
            setTimeout(() => {
                showCopyNotification = false;
            }, 2000); // Message will be visible for 2 seconds
        }).catch(e => console.error('Copy failed', e));
    }

</script>

<div class="page">
    <div class="banner">
        {#if webon.card}
            <img class="card" src={webon.card} alt="">
        {:else}
            <img class="card" src={card} alt="">
        {/if}
    </div>
    <div class="back-button">
        <button class="back" on:click={() => {
            browser && goto('/')
        }}>
            <Back/>
        </button>
        {#if !$data.isBrowser}
            <button class="download" on:click={async e => {
        e.stopPropagation()
        downloadWebOn(webon.download_link).then(() => {
        webon.downloaded = true
        }).catch(e => {
          console.error(e)
        })
        }}>

                {#if !webon.downloaded}
                    <span>Add Now</span>
                    <img src={plus} alt="">
                {:else}
                    <span>Open</span>
                    <img src={checkmark} alt="">
                {/if}
            </button>
        {/if}
    </div>
    <div class="top">
        <div class="icon">
            {#if webon.icon}
                <img src={webon.icon} alt="">
            {:else}
                <img src={icon} alt="">
            {/if}
        </div>
        <div class="name">
            {webon.name}
        </div>
    </div>
    {#if $data.isBrowser}
        <div class="qr-container">
            <QrCode value={"https://" + webon.domain} size={200}/>
        </div>

        <button class="copy-btn" on:click={copyToClipboard}>
            Copy Link
        </button>
        {#if showCopyNotification}
            <div class="copy-notification">
                Link has been copied!
            </div>
        {/if}
    {/if}
    <div class="description">
        <div>Description</div>
        {webon.description}
    </div>
    <div class="tag-filter">
        {#each webon.tags as tag}
            <button class={tag?.selected ? "tag selected" : "tag"} on:click={() => {
                    tag.selected = !tag?.selected
                }} disabled={true}>
                <span class="tag-label">{tag.name}</span>
            </button>
        {/each}
    </div>
    <!-- <div class="version">{webon.version}</div> -->
    <!-- <div class="suggestions">
        Suggestions for you
    </div>
    <div class="page">
        <WebonList/>
    </div> -->
</div>


<style lang="scss">
      .page {
        max-width: 800px;
        min-height: 90%;
        gap: 20px;
      }

      .banner {
        width: 100%;
        max-width: 500px;
        aspect-ratio: 5/3;
        position: relative;

        .card {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }

      .back-button {
        width: 100%;
        min-height: 50px;
        display: flex;
        justify-content: space-between;

        .back {
          border-radius: 1000px;
          background: var(--nomoPrimary);
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 30px;
          }
        }

        .download {
          background: var(--nomoPrimary);
          color: var(--nomoOnSecondary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 1000px;
          padding: 0 10px 0 20px;
          width: 200px;

          img {
            width: 30px;
          }
        }
      }


      .top {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 20px;

        img {
          border-radius: 15px;
          width: 90px;
          min-width: 90px;
        }

        .name {
          font-size: 30px;
          font-weight: bold;
          word-break: break-word;
        }
      }
      .qr-container {
        text-align: center;
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
        margin: 1.5rem 0;
      }
      .copy-btn {
        background: linear-gradient(45deg, #efcc80, #ad9050);
        color: white;
        border-radius: 30px;
        padding: 0.6rem 1.2rem;
        font-weight: bold;

        text-transform: uppercase;
        box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        &:hover {
          background: linear-gradient(45deg, #ad9050, #efcc80);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
      }
      .copy-notification {

        padding: 10px;
        background-color: #dcdcdc;
        color: black;
        border-radius: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        z-index: 1000;
      }

      .description {
        background: #f7f7f7;
        padding: 1.5rem;
        border-radius: 8px;
        margin: 1.5rem 0;
        font-size: 0.95rem;
        line-height: 1.5;
      }

      .description div {
        color: #555;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .suggestions {
        margin-top: 20px;
        width: 100%;
        padding: 0 10px;
        font-size: 18px;
        font-weight: bold;
      }


      .filters {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        max-width: 100%;
        overflow-x: scroll;
        padding-bottom: 10px;
        &::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 7px;
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background-color: #faf6f6;
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(255,255,255,0.1);
        }

        &::-webkit-scrollbar-thumb {
          background-color: #fcf4f4;
          border-radius: 10px;
          background-image: linear-gradient(180deg, #cecccc 25%, #bebebe 75%);
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: #555;
          background-image: linear-gradient(180deg, #666 25%, #777 50%, #666 75%);
        }

      }

      .filter-select {
        .select-css {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
          font-size: 1rem;
          background-color: white;
          cursor: pointer;
          &:hover {
            background-color: #f8f8f8;
          }
        }
      }

      .tag-filter {
        display: flex;
        gap: 0.5rem;
      }

      .tag {
        background: #f2f2f2;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        padding: 0.3rem 1rem;
        transition: all 0.2s;
        cursor: pointer;
      }

      .selected {
        background: #9b9b9b;
      }
    </style>