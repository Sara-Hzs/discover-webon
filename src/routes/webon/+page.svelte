<script>
    import {data} from "../../stores/data.js";
    import icon from "../../assets/icon.png"
    import card from "../../assets/card.png"
    import download from "../../assets/download.svg"
    import back from "../../assets/back.png"
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

    console.log(webon)

</script>

<div class="page">
    <div class="banner">
        {#if webon.card_image}
            <img class="card" src={webon.card_image} alt="">
        {:else}
            <img class="card" src={card} alt="">
        {/if}
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
    <div class="back-button">
        <button class="back" on:click={() => {
            browser && goto('/')
        }}>
            <img src={back} alt="">
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
</div>
<div class="suggestions">
    Suggestions for you
</div>
<div class="page">
    <WebonList/>
</div>

<style lang="scss">
  .page {
    min-height: 90%;
    gap: 20px;
  }
  .banner {
    min-height: 190px;
    max-width: 500px;
    position: relative;

    .icon {
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 80px;
    }
    .name {
      position: absolute;
      top: 20px;
      left: 20px;
      text-transform: uppercase;
      font-size: 22px;
      font-weight: bold;
      color: #4b4b4b;
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
      img {
        width: 50px;
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
      width: 90px;
    }
    .name {
      font-size: 30px;
      font-weight: bold;
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