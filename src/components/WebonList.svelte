
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

    // To checks if the user is on a mobile browser
    function isMobileBrowser() {

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    function shouldBeShown(platform) {
        const isDesktopEnvironment = isFallbackModeActive(); // Check if its a desktop browser
        const onMobileBrowser = isMobileBrowser(); // Check if its a mobile browser
        console.log('Desktop Environment:', isDesktopEnvironment, 'Mobile Browser:', onMobileBrowser);
        if (onMobileBrowser) {
            return platform.mobile; // Only show if mobile is true when on a mobile browser
        }
        if (isDesktopEnvironment) {
            return platform.desktop; // Only show if desktop is true when on a desktop browser
        }
        // For the Nomo app or other environments, follow the platform settings
        return platform.mobile || platform.desktop || platform.hub;
    }



    function filterWebonList() {
        let foundMatchingWebon = false;
        $data.filteredList = $data.webonList.filter(webon => {
            console.log('Webon:', webon);
            const isTrusted = webon.trusted;
            console.log('Trusted:', isTrusted);

            const matchesSearchQuery = webon.name.toLowerCase().includes(searchQuery.toLowerCase());
            const tagMatchesSearchQuery = webon.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
            const sloganMatchesSearchQuery = webon.slogan?.toLowerCase().includes(searchQuery.toLowerCase());
            const domainMatchesSearchQuery = webon.domain?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = webon.tags?.some(tag => tag.name.toLowerCase() === selectedTagName.toLowerCase());


            const isPlatformCompatible = shouldBeShown(webon.platform);
            console.log(`Webon: ${webon.name}, Trusted: ${isTrusted}, Platform Compatible: ${isPlatformCompatible}`);

            const itemMatches = isPlatformCompatible &&
                (isTrusted || matchesSearchQuery || tagMatchesSearchQuery || sloganMatchesSearchQuery || domainMatchesSearchQuery) &&
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 1rem;
    justify-items: center;
  }

  .search-filter-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 1rem;
  }

  .search-box {
    flex-grow: 1;
    max-width: 600px;
    position: relative;
    box-shadow: 0 4px 6px var(--nomoForeground1);
    border-radius: 4px;
  }

  .search-input {
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: black;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    }
    &::placeholder {
      color: black;
    }
  }

  .selected-tag-display {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 4px;
    box-shadow: none;
    cursor: pointer;
    .tag {
      margin-right: 10px;
      color: var(--nomoForeground2);
    }

    .clear-tag {
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: none;
      border: none;

      font-size: 14px;
    }
  }
</style>