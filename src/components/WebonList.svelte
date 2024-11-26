<script>
    import { data } from "../stores/data.js";
    import { filters } from "../stores/filters.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import Navbar from "./Navbar.svelte";
    import Header from "./Header.svelte";
    import { slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let showDropdown = false;


    onMount(async () => {
        window.scrollTo(0, 0);
    });

    $:console.log('data', $data)
    $: console.log('Current sorting method:', $filters.sortBy);
</script>



<Navbar />
<Header />

<div class="btns">
    <div class="filter-section">
        <div class="category">
            <h1>Categories</h1>
            <div class="dropdown">
                <button class="dropdown-toggle" on:click={() => showDropdown = !showDropdown}>
                    {#if $filters.tag}
                        {$filters.tag.name}
                    {:else}
                        All WebOns
                    {/if}
                    <span class="arrow" class:rotate={showDropdown}>▼</span>
                </button>
                {#if showDropdown}
                    <div class="dropdown-menu" transition:slide|local={{ duration: 200 }}>
                        {#each ['All WebOns', ...[...new Set($data.filteredList.flatMap(w => w.tags?.map(t => t.name)))]] as item (item)}
                            <button
                                    animate:flip={{ duration: 200 }}
                                    on:click={() => {
                                if(item === 'All WebOns') {
                                    $filters.tag = null;
                                } else {
                                    $filters.tag = { name: item };
                                }
                                showDropdown = false;
                            }}
                                    class:active={item === 'All WebOns' ? !$filters.tag : $filters.tag?.name === item}
                                    transition:scale|local={{ duration: 200, start: 0.95 }}>
                                {item}
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>


    <h1>Sort by</h1>
    <div class="button-group">
        <button
                on:click={() => { $filters.sortBy = 'newest'; }}
                class={$filters.sortBy === 'newest' ? 'active' : ''}>
            Newest
        </button>
        <button on:click={() => {
        $filters.sortBy = 'name';
    }} class={$filters.sortBy === 'name' ? 'active' : ''}>
            Name
        </button>
        <button
                on:click={() => { $filters.sortBy = 'popularity'; }}
                class={$filters.sortBy === 'popularity' ? 'active' : ''}>
            Popularity
        </button>
    </div>
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
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }



  .filter-section {
    flex: 0 0 250px;
    margin-right: auto;
    padding-bottom: 10px;

  }
  .arrow {
    transition: transform 0.2s ease;
  }

  .arrow.rotate {
    transform: rotate(180deg);
  }
  .category {
    border-radius: 8px;
  }

  .category h1 {
    margin-bottom: 5px;
    color: #959494;
    text-align: left;
    padding: 1rem 1rem 0.5rem 1rem;
  }

  .dropdown-toggle {
    width: 100%;
    padding: 8px 12px;
    background: #2a2a2a;
    color: white;
    border: 1px solid white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    transition: background 0.2s ease;

    &:hover {
      background: #333;
    }
  }

  .dropdown {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 5px;
    width: 100%;
    background: rgba(28, 28, 28, 0.95);
    backdrop-filter: blur(8px);

    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 6px;
    margin-top: 4px;
  }

  .dropdown-menu button {
    width: 100%;
    padding: 8px 12px;
    color: #e1e1e1;
    background: transparent;
    border: none;
    border-radius: 6px;
    text-align: left;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    margin: 2px 0;

    &:hover {
      background: rgba(156, 99, 238, 0.2);
      color: #fff;
    }

    &.active {
      background: #9c63ee;
      color: white;
    }
  }


  .dropdown-menu button.active:hover {
    background: #8852d9;
  }


  .dropdown-menu button + button {
    border-top: 1px solid rgba(255, 255, 255, 0.03);
  }


  .dropdown-menu {
    max-height: 300px;
    overflow-y: auto;


    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    &::-webkit-scrollbar-thumb {
      background: #444;
      border-radius: 4px;
    }
  }

  .btns h1 {
    font-weight: bold;
    color: #959494;
    margin-bottom: 10px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
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
    font-size: 1rem;

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
  @media (max-width: 768px) {
    .btns {
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }

    .btns h1 {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
    }

    .button-group {
      flex-direction: row;
      justify-content: center;
      gap: 5px;
    }

    button {
      flex: 1;
    }

    .filter-section {
      flex: none;
      width: 100%;
      margin-bottom: 20px;
    }

    .category h1 {
      text-align: center;
      padding: 0.5rem;
    }

    .dropdown {
      max-width: 300px;
      margin: 0 auto;
    }

    .dropdown-menu {
      left: 0;
      width: 100%;
    }
  }

  @media (max-width: 425px) {
    .btns {
      margin-top: 4px;
    }

    .btns h1 {
      color: #fff;
      margin-bottom: 5px;
      width: 100%;
      text-align: center;
    }

    .button-group {
      flex-direction: row;
      width: 100%;
    }

    button {
      width: 100%;
      margin-bottom: 5px;
      text-align: center;
    }
  }

  @media (min-width: 769px) {
    .btns {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 1rem;
      margin-bottom: 20px;
    }

    .btns h1 {
      margin-bottom: 0;
      margin-right: 10px;
      white-space: nowrap;
    }

    .button-group {
      gap: 10px;
      width: auto;
      display: flex;
    }
  }

</style>