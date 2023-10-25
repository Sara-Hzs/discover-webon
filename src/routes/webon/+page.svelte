<script>
    import {data} from "../../stores/data.js";
    import icon from "../../assets/icon.png"
    import card from "../../assets/card.png"
    import download from "../../assets/download.svg"
    import list from "../../assets/list.svg"
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import {nomo} from "nomo-plugin-kit/dist/nomo_api";
    import WebonList from "../../components/WebonList.svelte";

    let id = getParameterFromURL()
    let webon = $data[id]

    function getParameterFromURL() {
        const url = new URL(window.location.href)
        return url.searchParams.get('id');
    }

</script>

<div class="page">
        <div class="banner">
            {#if webon.card_image}
                <img class="card" src={webon.card_image} alt="">
            {:else}
                <img class="card" src={card} alt="">
            {/if}
        </div>
        <div class="back-button">
            <button class="back" on:click={() => {
            browser && goto('/')
        }}>
                <img src={list} alt="">
            </button>
            <button class="download" on:click={async e => {
        e.stopPropagation()
        nomo.injectQRCode({qrCode: webon.download_link, navigateBack: true}).then(() => {
            console.log("injected")
        }).catch(e => {
            console.log(e)
        })
    }}>
                <span>Download</span>
                <img src={download} alt="">
            </button>
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
        <div class="description">
            {webon.description}
        </div>
        <div class="version">{webon.version}</div>
    <div class="suggestions">
        Suggestions for you
    </div>
    <div class="page">
        <WebonList/>
    </div>
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
    }
  }
  .back-button {
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: space-between;
    .back {
      border-radius: 1000px;
      border: 2px #262738 solid;
      background: white;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 30px;
      }
    }
    .download {
      background: white;
      color: #262738;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 1000px;
      border: solid 2px #262738;
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
  }
  .suggestions {
    margin-top: 20px;
    width: 100%;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
</style>