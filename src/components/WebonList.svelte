<script>
    import { data } from "../stores/data.js";
    import { filters } from "../stores/filters.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import Navbar from "./Navbar.svelte";
    import Header from "./Header.svelte";




    onMount(async () => {
        window.scrollTo(0, 0);
    });


</script>


<Navbar />
<Header />

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

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
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

    .btns{
      margin-top: 2rem;
    }
  }

</style>