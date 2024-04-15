
<script>
    import {data} from "../stores/data.js";
    import WebonElement from "./WebonElement.svelte";
    import { filterWebonList } from "../utils/functions.js";

    let selectedLanguage;
    let selectedTags = $data.tagsList;
    let searchQuery = '';

    const getFilteredList = async () => {
        await filterWebonList($data.webonList, selectedLanguage, selectedTags)
    }

    $: $data.filteredList = $data.webonList.filter(webon => {
        return webon.name.toLowerCase().includes(searchQuery.toLowerCase()) || (webon.tags?.length > 0 && webon.tags.find(webon_tag => {
                return webon_tag.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
        )});

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

</style>

