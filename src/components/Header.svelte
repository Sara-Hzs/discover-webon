<script>
    import { onMount } from 'svelte';
    import QrCode from 'svelte-qrcode';
    import logo from '../assets/logo.svg';
    import Token_Generator from '../assets/Token_Generator.svg';
    import Swap from '../assets/Swap.svg';
    import Eurk from '../assets/eurk.svg';
    import Avinoc_DeFi from '../assets/avinoc_DeFi.svg';

    import { filters } from '../stores/filters.js';

    onMount(async () => {
        window.scrollTo(0, 0);
    });
</script>

<div class="search-qr-container">
    <div class="welcome-text">
        <div class="icon-container">
            <img src={Token_Generator} alt="Token Generator">
            <img src={Swap} alt="Swap">
            <img src={Eurk} alt="Eurk">
            <img src={Avinoc_DeFi} alt="Avinoc DeFi">
        </div>
        <h2>Welcome to</h2>
        <h1>Discover WebOns</h1>

        <div class="search-filter-container">
            <img src={logo} alt="Logo">
            <div class="search-box">
                <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={$filters.search} />
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


<style lang="scss">



  .search-filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

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

    .welcome-text h1, h2, .icon-container{
      display: none;
    }
    .search-input, button {
      font-size: 14px;
    }
    .search-qr-container{
      width: 100%;
    }
    .qr-container {
      display: none;
    }

    .search-filter-container {
      flex-direction: row;
      align-items: flex-start;
      padding: 10px;
      border-radius: 10px;
    }

    .search-filter-container img {
      width: 50px;
    }



  }

  @media (max-width: 425px) {
    .search-qr-container{
      width: 100%;
    }
    .search-filter-container {
      flex-direction: row;
      align-items: center;
      padding: 10px;
      border-radius: 10px;
      width: 100%;

    }

    .search-filter-container img {
      width: 40px;
    }

    .search-box {
      flex-grow: 1;

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
        pointer-events: none;
        user-select: none;


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
        pointer-events: none;
        user-select: none;
      }

      h2 {
        font-size: 1.5rem;
        pointer-events: none;
        user-select: none;


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
      pointer-events: none;
      user-select: none;
    }

  }

</style>