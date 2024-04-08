<script>
    import { isFallbackModeActive } from 'nomo-webon-kit';
    import {data} from "../../stores/data.js";
    import icon from "../../assets/icon.png"
    import card from "../../assets/card.png"
    import plus from "../../assets/plus.svg"
    import checkmark from "../../assets/checkmark.svg"
    import {browser} from "$app/environment";
    import {goto} from "$app/navigation";
    import Back from "../../components/Icons/Back.svelte";
    import {downloadWebOn, image} from "../../utils/functions.js";
    import QRCode from 'svelte-qrcode';
    import { onMount } from 'svelte';
    import { tick } from 'svelte';

    let id = getParameterFromURL()
    let webon = $data[id]
    let isInNomoEnvironment = isFallbackModeActive();
    let qrValue = 'value for the QR code';
    let qrSize = 128;
    function getParameterFromURL() {
        const url = new URL(window.location.href)
        return url.searchParams.get('id');
    }


    async function copyToClipboard(text) {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                alert('Copied to clipboard');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        } else {
            console.error('Clipboard API not available.');
        }
    }

    $: if (webon) {
        qrValue = webon.download_link;
    }

    let reviews = [];

    //for fetching reviews from the backend
    async function fetchReviews() {
        const response = await fetch(`/api/reviews?id=${id}`);
        reviews = await response.json();
    }

    onMount(() => {
        fetchReviews();
    });

</script>

<div class="page">
    <div class="banner">
        {#if image(webon.card)}
            <img class="card" src={image(webon.card)} alt="">
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
    </div>
        {#if isInNomoEnvironment}
            <!-- Show "Add Now" button only in Nomo environment -->
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
        {:else}
            <!-- Show "Copy Link" button and QR code only outside of Nomo environment -->
            <div class="qr-container">
                <QRCode value={qrValue} size={qrSize} />
            </div>

            <button class="copy-btn" on:click={() => copyToClipboard(qrValue)}>
                Copy Link
            </button>
        {/if}
    <div class="top">
        <div class="icon">
            {#if image(webon.icon)}
                <img src={image(webon.icon)} alt="">
            {:else}
                <img src={icon} alt="">
            {/if}
        </div>
        <div class="name">
            {webon.name}
        </div>
    </div>
    <div class="description">
        <div>Description</div>
        {webon.description}
    </div>


            <div class="version">{webon.version}

    </div>
    <div class="reviews-section">
        <h2>Ratings and Reviews</h2>
        {#each reviews as review}
            <div class="review">
                <div class="review-header">
                    <span class="review-name">{review.name}</span>
                    <span class="review-date">{review.date}</span>
                </div>
                <div class="review-rating">{"★".repeat(review.rating)}</div>
                <p class="review-comment">{review.comment}</p>
            </div>
        {/each}
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


  }
  .download {
    background: var(--nomoPrimary);
    color: var(--nomoOnSecondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1000px;
    padding: 10px 10px 10px 20px;
    width: 200px;


    img {
      width: 30px;
    }
    @media (min-width: 768px) {
      display: none;
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

  .qr-container {
    display: none;
    margin: 20px auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: fit-content;
  }

  .copy-btn {
    padding: 10px;
    margin-top: 10px;
    background-color: #bba46f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: none;

  }

  .copy-btn:hover {
    background-color: #c4ab76;
  }
  .suggestions {
    margin-top: 20px;
    width: 100%;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  @media (min-width: 768px) {
    .qr-container, .copy-btn {
      display: block;
    }
  }



</style>