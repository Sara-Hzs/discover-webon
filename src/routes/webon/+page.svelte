<script>
    import {data} from "../../stores/data.js";
    import icon from "../../assets/icon.png";
    import card from "../../assets/card.png";
    import plus from "../../assets/plus.svg";
    import checkmark from "../../assets/checkmark.svg";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Back from "../../components/Icons/Back.svelte";
    import QrCode from "svelte-qrcode";
    import {downloadWebOn} from "../../utils/functions.js";
    import { selectedTag } from "../../stores/selectedTagStore.js";

    let id = getParameterFromURL();
    let webon = $data[id];

    function selectTag(tagName) {
        $selectedTag = tagName
        browser && goto('/');
    }

    function backToWebonList() {
        selectedTag.set("");
        browser && goto('/');
    }


    function getParameterFromURL() {
        const url = new URL(window.location.href);
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
        <button class="back" on:click={backToWebonList}>
            <Back/>
        </button>
        {#if !$data.isBrowser}
            <button class="download" on:click={async e => {
        e.stopPropagation()
        downloadWebOn(webon.domain).then(() => {
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
            <QrCode value={"https://nomo.app/webon/" + webon.domain} size={200}/>
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
            <button on:click={() => selectTag(tag.name)}>
                {tag.name}
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
        max-width: 1300px;
        margin: auto;
        padding: 30px;

        border-radius: 10px;
        box-shadow: 0 2px 15px rgba(0,0,0,0.05);
        overflow: hidden;
      }

        .banner {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .card {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 10px 8px rgba(0,0,0,0.05);
        }


      .back-button {
        width: 100%;
        margin-bottom: 20px;
        min-height: 50px;
        display: flex;
        justify-content: space-between;
        button {
          border: none;
          background-color: #f0f0f0;
          color: #333;
          padding: 10px 15px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background-color: #e0e0e0;
          }
        }


        .download {
          background: var(--nomoPrimary);
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

        .icon {
          width: 80px;
          height: 80px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10%;
            object-fit: cover;
            box-shadow: 0 1px 4px rgba(0,0,0,0.1);
            padding: 10px;
          }
        }


        .name {
          font-size: 24px;
          font-weight: bold;
          word-break: break-word;
          padding-top: 20px;
        }
      }
      .qr-container {
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 20px;
      }

      .copy-btn {
        display: block;
        width: auto;
        margin: auto;
        padding: 10px 20px;
        background-color: #ddd;
        color: #333;
        border-radius: 30px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #ccc;
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
        padding: 20px;
        margin-top: 20px;
        border-radius: 8px;

        font-size: 16px;
        line-height: 1.6;
      }

      .description div {
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

      .tag-filter {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        max-width: 100%;
        overflow-x: scroll;
        padding-bottom: 10px;
        scrollbar-width: thin;
        scrollbar-color: #fcf4f4 #faf6f6;

        &::-webkit-scrollbar {
          height: 6px;
        }

        &::-webkit-scrollbar-track {
          background-color: #faf6f6;
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
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

      .tag-filter button {

        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;

        &:hover {
          transform: translateY(3px);
        }
      }

      .selected {
        background-color: #9b9b9b;
        color: #fff;
      }
    </style>