
<script>
    import { data } from "../stores/data.js";
    import { selectedTag } from "../stores/selectedTagStore.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import { isFallbackModeActive } from "nomo-webon-kit";


    let searchQuery = '';

    let selectedTagName = "";
    selectedTag.subscribe(value => {
        selectedTagName = capitalizeFirstLetter(value.toLowerCase());
        filterWebonList();
    });


    function shouldBeShown(platform) {
        const isDesktopEnvironment = isFallbackModeActive(); // This checks if the app is running in a desktop browser
        console.log('Desktop Environment:', isDesktopEnvironment); // Log the environment

        // to determine if webon should be shown
        if (isDesktopEnvironment) {
            // If we are in a desktop environment, check the desktop property
            return platform.desktop;
        } else {
            // If we are not in a desktop environment (thus mobile or hub), check the respective property
            return platform.mobile || platform.hub;
        }
    }


    function filterWebonList() {
        let foundMatchingWebon = false;
        $data.filteredList = $data.webonList.filter(webon => {
            const matchesSearchQuery = webon.name.toLowerCase().includes(searchQuery.toLowerCase());
            const tagMatchesSearchQuery = webon.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
            const sloganMatchesSearchQuery = webon.slogan?.toLowerCase().includes(searchQuery.toLowerCase());
            const domainMatchesSearchQuery = webon.domain?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = webon.tags?.some(tag => tag.name.toLowerCase() === selectedTagName.toLowerCase());

            const isPlatformCompatible = shouldBeShown(webon.platform);
            console.log(`Webon: ${webon.name}, Platform Compatible: ${isPlatformCompatible}`); // Debug log

            const itemMatches = isPlatformCompatible &&
                (matchesSearchQuery || tagMatchesSearchQuery || sloganMatchesSearchQuery || domainMatchesSearchQuery) &&
                (!selectedTagName || matchesTag);
            if (itemMatches) foundMatchingWebon = true;
            return itemMatches;
        });
        return foundMatchingWebon;
    }
    function clearSelectedTag() {
        selectedTag.set("");
        selectedTagName = "";
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $: if (searchQuery) {
        const foundMatchingWebon = filterWebonList();
        if (!foundMatchingWebon) clearSelectedTag();
    } else {
        filterWebonList();
    }
    onMount(() => {
        window.scrollTo(0, 0);
    });

</script>

<!--Selected Tag Display -->
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

    border-radius: 20px;
    box-shadow: 0 4px 6px var(--nomoForeground1);
    overflow: hidden;
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
      color: black;
    }
  }

  .selected-tag-display {
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;

    .tag {
      color: var(--nomoForeground2);
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
    }

    .clear-tag {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>