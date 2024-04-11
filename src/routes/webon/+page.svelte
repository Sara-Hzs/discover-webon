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
            <QrCode value={webon.download_link} size={200}/>
        </div>

        <button class="copy-btn" on:click={() => {
                navigator.clipboard.writeText(webon.download_link);
            }}>
            Copy Link
        </button>
    {/if}
        <div class="description">
            <div>Description</div>
            {webon.description}
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

      .description {
        margin: 20px 10px;
        flex: 1;

        div {
          font-weight: bold;
        }
      }

      .suggestions {
        margin-top: 20px;
        width: 100%;
        padding: 0 10px;
        font-size: 18px;
        font-weight: bold;
      }
    </style>