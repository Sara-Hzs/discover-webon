<script>
    import { data } from "../stores/data.js";
    import { selectedTag } from "../stores/selectedTagStore.js";
    import WebonElement from "./WebonElement.svelte";

    let searchQuery = '';

    let selectedTagName = "";
    selectedTag.subscribe(value => {
        selectedTagName = value.toLowerCase();
        filterWebonList();
    });

    function filterWebonList() {
        $data.filteredList = $data.webonList.filter(webon => {
            const matchesSearchQuery = webon.name.toLowerCase().includes(searchQuery.toLowerCase());
            const tagMatchesSearchQuery = webon.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesTag = webon.tags?.some(tag => tag.name.toLowerCase() === selectedTagName);
            return (matchesSearchQuery || tagMatchesSearchQuery) && (!selectedTagName || matchesTag);
        });
    }

    function clearSelectedTag() {
        selectedTag.set("");
        selectedTagName = "";
    }


    $: if (searchQuery && selectedTagName) {
        clearSelectedTag();
    }

    $: searchQuery, filterWebonList();
</script>
<!-- Filter UI and Selected Tag Display -->
<div class="search-filter-container">
    <div class="search-box">
        <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={searchQuery} />
    </div>

    {#if selectedTagName}
        <button class="selected-tag-display" on:click={clearSelectedTag}>
            <span class="tag">{selectedTagName}</span>
            <span class="clear-tag">×</span>
        </button>
    {/if}
</div>

<div class="container">
    {#each $data.filteredList as webon}
        <WebonElement {webon} />
    {/each}
</div>

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

  .selected-tag-display {
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 15px;
    background-color: #f2f2f2;
    font-weight: bold;
    cursor: pointer;

    .tag {
      color: black;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      background-color: #dcdcdc;
    }

    .clear-tag {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>

