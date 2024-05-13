<script>
    import { data } from "../stores/data.js";
    import { filters } from "../stores/filters.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import QrCode from 'svelte-qrcode';
    import logo from '../assets/logo.svg';
    let showCopyNotification = false;


    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copying to clipboard was successful!');
        }, err => {
            console.error('Could not copy text: ', err);
        });
        return true;
    }
    onMount(async () => {
        window.scrollTo(0, 0);
    });

</script>

<div class="search-filter-container">
    <img src={logo} alt="">
    <div class="search-box">
        <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={$filters.search} />
    </div>
    <div class="btns">
    <h1>Sort by</h1>
    <button on:click={() => {
        $filters.sortBy = 'popularity'
    }} class={$filters.sortBy === 'popularity' ? 'active' : ''}>
        Popularity
    </button>
    <button on:click={() => {
        $filters.sortBy = 'name'
    }} class={$filters.sortBy === 'name' ? 'active' : ''}>
        Name
    </button>
</div>

    <div class="qr-container">
    <QrCode value="https://nomo.app/webon/discover.webon.info" size={200} />
</div>

    <button class="copy-btn" on:click={() => {
    showCopyNotification = copyToClipboard("https://nomo.app/webon/discover.webon.info")
}}>
       scan here
    </button>

</div>


{#if $filters.tag}
    <div class="tag" on:click={() => $filters.tag = null}>
        <div>Selected Tag:</div>
        <div>{$filters.tag.name}</div>
        <div>Delete</div>
    </div>
{/if}
<div class="container">
    {#each $data.filteredList as webon}
        <WebonElement {webon} />
    {/each}
</div>


<style lang="scss">
  .header {
    display: block;
    padding: 40px 20px;
    text-align: center;
    background-color: white;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 5px;
    justify-content: center;
  }

  .tag {
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    background: #36f3fd;
    border-radius: 5px;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    text-align: center;
    margin-bottom: 20px;
    > div {
      width: 33%;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }

  .search-filter-container {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    gap: 10px;
    img {
      width: 50px;
    }
  }
  .search-box {
    display: flex;
    width: 100%;
    max-width: 500px;
    border: none;
    border-radius: 5px;
    overflow: hidden;
  }
  .search-input {
    border: none;
    padding: 0.75rem 1rem;
    flex-grow: 1;
    font-size: 1rem;
    color: black;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: black;
    }
  }
  .sorting-label {
    font-weight: bold;
    margin-bottom: 20px;
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
    text-align: right;
    gap: 10px;
    font-weight: bold;
    h1 {
      width: 100%;
      font-weight: bold;
      color: #959494;
    }
  }
  button {
    margin: 0 5px;
    padding: 8px 20px;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    color: white;
    outline: none;

    &:hover, &:focus {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

  }
  button.active {
    background-color: #9c63ee;
    font-weight: bold;
    border: 1px solid white;
  }
  .qr-container {
    margin: 10px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .copy-btn {
    display: block;
    margin: 10px auto;
    background-color: #f65cc9;
    color: white;
  }
  .copy-notification {
    text-align: center;
    color: #ff4081;
    font-weight: bold;
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
    }

    .search-input, button {
      font-size: 14px;
    }

    .header{
      display: none;
    }
  }

</style>