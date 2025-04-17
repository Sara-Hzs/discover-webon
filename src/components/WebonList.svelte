<script>
    import { data } from "../stores/data.js";
    import { filters } from "../stores/filters.js";
    import { expandedFolders } from "../stores/expandedFolders.js";

    import Navbar from "./Navbar.svelte";
    import Header from "./Header.svelte";
    import DisplayMode from "./DisplayMode.svelte";
    import Categories from "./Categories.svelte";
    import AllWebons from "./AllWebons.svelte";
    import Categorized from "./Categorized.svelte";
    import {onMount} from "svelte";

    let isLoading = false;
    let showCategoryDropdown = false;
    let displayMode = localStorage.getItem('displayMode') || 'All WebOns';
    let showOldDropdown = localStorage.getItem('showOldDropdown') === 'true';
    let showOldDropdownMenu = false;
    let selectedTag = JSON.parse(localStorage.getItem('selectedTag')) || null;
    const INITIAL_ITEMS = 4;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tagParam = urlParams.get('tag');

        if (tagParam) {
            selectedTag = { name: decodeURIComponent(tagParam) };
            localStorage.setItem('selectedTag', JSON.stringify(selectedTag));
        }

        if (selectedTag) {
            showOldDropdown = true;
            localStorage.setItem('showOldDropdown', 'true');
        }
    });



    $: $filters.tag = selectedTag;

    // Grouping logic
    $: groupedWebons = $data.filteredList.reduce((groups, webon) => {
        const tags = webon.tags?.length ? webon.tags : [{ name: 'Uncategorized' }];
        tags.forEach(tag => {
            if (!groups[tag.name]) groups[tag.name] = [];
            groups[tag.name].push(webon);
        });
        return groups;
    }, {});

    function toggleFolder(tag) {
        expandedFolders.toggle(tag);
    }

    function toggleShowCategoryDropdown() {
        showCategoryDropdown = !showCategoryDropdown;
    }

    function toggleShowOldDropdownMenu() {
        showOldDropdownMenu = !showOldDropdownMenu;
    }

    async function setDisplayMode(option) {
        isLoading = true;
        displayMode = option;
        showCategoryDropdown = false;

        if (option === 'All WebOns') {
            resetSelections();
        } else {
            showOldDropdown = true;
            localStorage.setItem('showOldDropdown', true);
        }
        localStorage.setItem('displayMode', option);

        await new Promise(resolve => setTimeout(resolve, 600));
        isLoading = false;
    }


    function resetSelections() {
        selectedTag = null;
        localStorage.removeItem('selectedTag');
        $filters.tag = null;
        showOldDropdown = false;
        localStorage.setItem('showOldDropdown', false);
    }

    function setSelectedTag(item) {
        if (item === 'All Categories') {
            selectedTag = null;
        } else {
            selectedTag = { name: item };
        }
        localStorage.setItem('selectedTag', JSON.stringify(selectedTag));
        showOldDropdownMenu = false;
    }


    function sortByNewest() {
        $filters.sortBy = 'newest';
    }
    function sortByName() {
        $filters.sortBy = 'name';
    }
    function sortByPopularity() {
        $filters.sortBy = 'popularity';
    }
</script>

<Navbar />
<Header />
<div class="top-controls">
    <!-- Left side controls -->
    <div class="left-controls">
        <!-- Display Mode -->
        <DisplayMode
                {displayMode}
                {showCategoryDropdown}
                toggleShowCategoryDropdown={toggleShowCategoryDropdown}
                setDisplayMode={setDisplayMode}
        />

        <!-- Categories -->
        <Categories
                {showOldDropdown}
                {showOldDropdownMenu}
                toggleShowOldDropdownMenu={toggleShowOldDropdownMenu}
                {selectedTag}
                setSelectedTag={setSelectedTag}
        />
    </div>

    <!-- Sort by area, only if displayMode = "All WebOns" -->
    {#if displayMode === 'All WebOns'}
        <div class="sort-controls">
            <span>Sort by</span>
            <div class="button-group">
                <button on:click={sortByNewest} class:active={$filters.sortBy === 'newest'}>
                    Newest
                </button>
                <button on:click={sortByName} class:active={$filters.sortBy === 'name'}>
                    Name
                </button>
                <button on:click={sortByPopularity} class:active={$filters.sortBy === 'popularity'}>
                    Popularity
                </button>
            </div>
        </div>
    {/if}
</div>

{#if isLoading}
    <div class="loading-container">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <span class="loading-text">Loading...</span>
        </div>
    </div>
{:else}
    {#if displayMode === 'All WebOns'}
        <AllWebons />
    {:else if displayMode === 'Categorized'}
        <Categorized
                {groupedWebons}
                {INITIAL_ITEMS}
                {toggleFolder}
        />
    {/if}
{/if}

<style lang="scss">
  .top-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 20px;
    font-weight: bold;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }

  .left-controls {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;

    }
  }

  .sort-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;


    }

    span {
      font-weight: bold;
      color: #959494;
    }
  }

  .button-group {
    display: flex;
    gap: 10px;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: center;
      gap: 2px;
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
    font-size: 1rem;

    &:hover, &:focus {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
  font-size: 14px;


    }
  }
  button.active {
    background-color: #9c63ee;
    font-weight: bold;
    border: 1px solid white;
  }
  .loading-container {
    width: 100%;
    min-height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(156, 99, 238, 0.2);
    border-radius: 50%;
    border-top-color: #9c63ee;
    animation: spin 0.8s linear infinite;
  }

  .loading-text {
    color: #9c63ee;
    font-weight: 500;
    font-size: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
