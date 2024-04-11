<script>
    import {data} from "../stores/data.js";
    import WebonElement from "./WebonElement.svelte";
    import { filterWebonList } from "../utils/functions.js";

    let selectedLanguage;
    let selectedTags = [];
    let searchQuery = '';

    const getFilteredList = async () => {
        await filterWebonList($data.webonList, selectedLanguage, selectedTags)
    }

    $: $data.filteredList = $data.webonList.filter(webon => webon.name.toLowerCase().includes(searchQuery.toLowerCase()));

    $: if (selectedLanguage != null || selectedTags.length > 0) {
        $data.filteredList = getFilteredList()
    }

</script>

<!-- Filter UI -->
<div class="search-filter-container">
    <div class="search-box">
        <input type="text" placeholder="Search WebOns..." class="search-input" bind:value={searchQuery} />
    </div>


    <div class="filters">
<!--        <div class="filter-select">-->
<!--            <select bind:value={selectedLanguage} class="select-css">-->
<!--                <option value="">All Languages</option>-->
<!--                <option value="en">English</option>-->
<!--                <option value="de">German</option>-->
<!--            </select>-->
<!--        </div>-->

        <div class="tag-filter">
            {#each $data.tagsList as tag}
                <button class={tag?.selected ? "tag selected" : "tag"} on:click={() => {
                    tag.selected = !tag?.selected
                }}>
                    <span class="tag-label">{tag.name}</span>
                </button>
            {/each}
        </div>
    </div>
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

  .filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    max-width: 100%;
    overflow-x: scroll;
    padding-bottom: 10px;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: #faf6f6;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(255,255,255,0.1);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fcf4f4;
      border-radius: 10px;
      background-image: linear-gradient(180deg, #cecccc 25%, #bebebe 75%);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #555;
      background-image: linear-gradient(180deg, #666 25%, #777 50%, #666 75%);
    }

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
    cursor: pointer;
  }

  .selected {
    background: #9b9b9b;
  }
</style>

