<script>
    import { data } from "../stores/data.js";
    import { filters } from "../stores/filters.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import QrCode from 'svelte-qrcode';
    import logo from '../assets/logo.svg';
    import Navbar from "./Navbar.svelte";
    import Token_Generator from '../assets/Token_Generator.svg';
    import Swap from '../assets/Swap.svg';
    import Eurk from '../assets/eurk.svg';
    import Avinoc_DeFi from '../assets/avinoc_DeFi.svg';



    onMount(async () => {
        window.scrollTo(0, 0);
    });


</script>
<Navbar />

<div class="search-qr-container">
    <div class="welcome-text">
        <div class="icon-container">
            <img src={Token_Generator} alt="Token Generator">
            <img src={Swap} alt="Swap">
            <img src={Eurk} alt="Eurk">
            <img src={Avinoc_DeFi} alt="Avinoc DeFi">
        </div>
        <h2>Welcome to</h2>
        <h1>Discover WebOn</h1>

        <div class="search-filter-container">
            <img src={logo} alt="Logo">
            <div class="search-box">
                <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={$filters.search}/>
            </div>
        </div>
    </div>
    <div class="qr-container">
        <div class="qr-wrapper">
            <QrCode value="https://nomo.app/webon/discover.webon.info" size={200}/>
            <span>Scan to install Discover WebOns</span>
        </div>
    </div>
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

{#if $filters.tag}
    <div class="tag" on:click={() => $filters.tag = null}>
        <span class="tag-label">Selected Tag:</span>
        <span class="tag-name">{$filters.tag.name}</span>
        <span class="delete-btn">×</span>
    </div>
{/if}
<div class="container">
    {#each $data.filteredList as webon}
        <WebonElement {webon} />
    {/each}
</div>

<style lang="scss">

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    justify-content: center;
  }
  .tag {
    max-width: 400px;
    margin: 0 auto;
    font-weight: bold;
    font-size: 14px;
    background: #36f3fd;
    border-radius: 5px;
    color: #333333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 18px;
    text-align: center;
    margin-bottom: 30px;
    position: relative;
  }

  .tag-label {
    margin-right: 5px;
  }

  .tag-name {
    margin-left: 2px;
    margin-right: 8px;
  }

  .delete-btn {
    cursor: pointer;
    font-size: larger;
    position: absolute;
    top: 7px;
    right: 8px;
  }

  .search-filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    gap: 10px;
    img {
      width: 90px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    font-weight: bold;

  }

  .qr-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 150px;
  }

  .qr-wrapper > span {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
    }
.welcome-text h1, h2, .icon-container{
  display: none;
}
    .search-input, button {
      font-size: 14px;
    }

    .header {
      display: none;
    }

    .qr-container {
      display: none;
    }

    .search-filter-container {
      flex-direction: row;
      align-items: flex-start;
      padding: 10px;
      border-radius: 10px;
      gap: 10px;
    }

    .search-filter-container img {
      width: 50px;
    }

    .btns {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      margin-top: 10px;
    }

    .btns h1 {
      margin-bottom: 0;
      color: #fff;
    }

    button {
      background-color: #444;
      color: #fff;
      flex: 1;
    }

    button.active {
      background-color: #9c63ee;
      font-weight: bold;
    }

  }

  @media (max-width: 425px) {
    .search-filter-container {
      flex-direction: row;
      align-items: center;
      padding: 10px;

      border-radius: 10px;
      gap: 10px;
    }

    .search-filter-container img {
      width: 40px;
    }

    .search-box {
      flex-grow: 1;
    }

    .btns {
      flex-direction: row;
      align-items: center;
      width: 100%;
      margin-top: 4px;
    }

    .btns h1 {
      color: #fff;
      margin-bottom: 5px;
      width: 100%;
      text-align: right;
    }

    button {
      background-color: #444;
      color: #fff;
      width: 100%;
      margin-bottom: 5px;
      text-align: center;
    }

    button.active {
      background-color: #9c63ee;
      font-weight: bold;
    }
  }

  @media (min-width: 769px) {
    .search-qr-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: #0f0f0f;
      padding: 4rem 9rem;
    }


    .welcome-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: #fff;
      width: 50%;
      .icon-container {
        display: flex;
        align-items: center;
        position: relative;
        gap: 8px;
        padding-bottom: 10px;


        img {
          width: 45px;
          height: auto;
          position: relative;
          border-radius: 12px;
        }

        img:nth-child(1) {
          transform: rotate(-15deg);
          z-index: 1;
        }

        img:nth-child(2) {
          transform: rotate(5deg);
          left: -10px;
          z-index: 2;
        }

        img:nth-child(3) {
          transform: rotate(-10deg);
          left: -20px;
          z-index: 3;
        }

        img:nth-child(4) {
          transform: rotate(10deg);
          left: -30px;
          z-index: 4;
        }
      }
      h1 {
        font-size: 2rem;
        margin: 0;
        color: #25dff0;
      }

      h2 {
        font-size: 1.5rem;


      }
    }
    .search-filter-container {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;


      img {
        display: none;
      }
    }

    .search-box {
      max-width: none;
      width: 100%;
    }

    .qr-container {
      flex-direction: row;
      margin-left: 2rem;
    }

    .btns{
      margin-top: 2rem;
    }
  }

</style>