<!-- WebonList.svelte -->

<script>
    import { onMount } from "svelte";
    import WebonElement from "./WebonElement.svelte";
    import { fetchWebonList } from "../utils/functions.js";
    import mockWebons from '../assets/webon_list.json';

    let webons = [];
    let loading = true;
    let error = '';
    let selectedLanguage;
    let selectedTags = [];
    let availableTags = extractTags(mockWebons);

    function extractTags(list) {
        const tags = new Set();
        list.forEach(webon => webon.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }

    async function updateWebonList() {
        loading = true;
        try {
            webons = await fetchWebonList(selectedLanguage, selectedTags);
        } catch (e) {
            error = 'Failed to fetch webons: ' + e.message;
        }
        loading = false;
    }

    onMount(updateWebonList);

    $: if (selectedLanguage != null || selectedTags.length > 0) {
        updateWebonList();
    }
    let searchQuery = '';

    $: filteredWebons = webons.filter(webon =>
        webon.name.toLowerCase().includes(searchQuery.toLowerCase()));
</script>

<!-- Filter UI -->
<div class="search-filter-container">
    <div class="search-box">
        <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={searchQuery} />
    </div>

    <div class="filters">
        <div class="filter-select">
            <select bind:value={selectedLanguage} class="select-css">
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="de">German</option>

            </select>
        </div>

        <div class="tag-filter">
            {#each availableTags as tag, index}
                <div class="tag">
                    <input type="checkbox" bind:group={selectedTags} value={tag} id={'tag-' + index}>
                    <label class="tag-label" for={'tag-' + index}>{tag}</label>
                </div>
            {/each}
        </div>
    </div>
</div>

{#if loading}
    <p>Loading...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <div class="container">
        {#each webons as webon}
            <WebonElement {webon} />
        {/each}
    </div>
{/if}

<style lang="scss">
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
  .search-filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .search-box {
    display: flex;
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    &:hover {
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
  }

  .search-input {
    border: none;
    padding: 0.75rem 1rem;
    flex-grow: 1;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #aaa;
    }
  }

  .filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .filter-select {
    .select-css {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid #ccc;
      font-size: 1rem;
      background-color: white;
      cursor: pointer;
      &:hover {
        background-color: #f8f8f8;
      }
    }
  }

  .tag-filter {
    display: flex;
    gap: 0.5rem;
  }

  .tag {
    background: #f2f2f2;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem;
    transition: all 0.2s;
    &:hover {
      background: #e2e2e2;
    }
    input {
      margin-right: 0.5rem;
      accent-color: #007bff;
    }
    .tag-label {
      cursor: pointer;
    }
  }
</style>

