<script>
    import {data} from "../../stores/data.js";
    import {filters} from "../../stores/filters.js";
    import icon from "../../assets/icon.png";
    import card from "../../assets/card.png";
    import plus from "../../assets/plus.svg";
    import checkmark from "../../assets/checkmark.svg";
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Back from "../../components/Icons/Back.svelte";
    import QrCode from "svelte-qrcode";
    import {downloadWebOn, formatAddNumber, copyToClipboard} from "../../utils/functions.js";

    let id = getParameterFromURL();
    let webon = $data[id];

    function backToWebonList() {
        browser && goto('/');
    }

    function getParameterFromURL() {
        const url = new URL(window.location.href);
        return url.searchParams.get('id');
    }

    let showCopyNotification = false;

    $: if (showCopyNotification) {
        setTimeout(() => showCopyNotification = false, 2000);
    }

</script>

<div class="page">
    <div class="banner">
        {#if webon.card}
            <img class="card" src={webon.card} alt="Card image">
        {:else}
            <img class="card" src={card} alt="Default card image">
        {/if}
        {#if $data.isBrowser}
            <div class="qr-copy-container">
                <div class="qr-container">
                    <QrCode value={"https://nomo.app/webon/" + webon.domain} size={200}/>
                </div>
                <button class="copy-btn" on:click={() => {
                showCopyNotification = copyToClipboard("https://nomo.app/webon/" + webon.domain);
            }}>
                    Copy Link
                </button>
                {#if showCopyNotification}
                    <div class="copy-notification">
                        Link has been copied!
                    </div>
                {/if}
            </div>
        {/if}
    </div>
    <div class="back-button">
        <button class="back" on:click={backToWebonList}>
            <Back/>
        </button>
        {#if !$data.isBrowser}
            <button class="download" on:click={async e => {
        e.stopPropagation()
        downloadWebOn(webon).then(() => {
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
            <a href="https://{webon.domain}" target="_blank" class="domain" title="Visit {webon.name}">
                https://{webon.domain}
            </a>
            <div class="metrics">
                {webon?.metrics?.adds ? formatAddNumber(webon.metrics.adds) : '0'} 🤍
            </div>
        </div>
    </div>

    <div class="description">
        <div>Description</div>
        {webon.description}
    </div>
    <div class="tag-filter">
        {#each webon.tags as tag}
            <button on:click={() => {
                $filters.tag = tag
                goto('/')
            }}>
                {tag.name}
            </button>
        {/each}
    </div>
</div>

<style lang="scss">
  .page {
    max-width: 1300px;
    margin: auto;
    padding: 30px;

    border-radius: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .banner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;
  }

  .card {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 10px 8px rgba(0, 0, 0, 0.05);
    margin-right: 100px;
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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }
    }


    .name {
      font-size: 24px;
      font-weight: bold;
      word-break: break-word;
      display: flex;
      justify-content: center;
      flex-direction: column;

      .domain {
        font-size: 18px;

        &:hover {
          text-decoration: underline;
        }
      }

      .metrics, .domain {
        font-size: 18px;
      }
    }
  }
  .qr-copy-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 150px;
    position: relative;


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

    padding: 10px 20px;
    background-color: #ddd;
    color: #333;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 10px;
    &:hover {
      background-color: #ccc;
    }
  }

  .copy-notification {
    padding: 8px 20px;
    font-size: 12px;
    background-color: #dcdcdc;
    color: black;
    border-radius: 30px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    text-align: center;
    display: inline-block;
    z-index: 1000;

  }

  .description {
    margin-top: 20px;
    border-radius: 8px;
    text-align: justify;
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
  @media (max-width: 768px) {
    .banner {
      flex-direction: column;

      .card {
        margin-right: 0;
        margin-bottom: 10px;
      }

      .qr-copy-container {
        flex-direction: column;
      }
    }
  }
</style>