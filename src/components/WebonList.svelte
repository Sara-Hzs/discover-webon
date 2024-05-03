<script>
    import { data } from "../stores/data.js";
    import { selectedTag } from "../stores/selectedTagStore.js";
    import WebonElement from "./WebonElement.svelte";
    import { onMount } from 'svelte';
    import { isFallbackModeActive, nomoGetPlatformInfo, nomoGetExecutionMode } from "nomo-webon-kit";

    //variables
    let searchQuery = ''; // To store search query
    let executionMode = null; // To store execution mode
    let selectedTagName = ""; // To store selected tag name
    let webonGroups = [];


    selectedTag.subscribe(value => {
        selectedTagName = capitalizeFirstLetter(value.toLowerCase()); // Capitalizing and storing selected tag name
        filterWebonList(); // Filtering webon list based on selected tag
    });

    // Function to check if the browser is a mobile browser
    function isMobileBrowser() {
        const userAgent = navigator.userAgent; // Getting user agent string
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    }

    // To run when the component is loaded
    onMount(async () => {
        try {
            const modeInfo = await nomoGetExecutionMode(); // To get information about how it's being run
            executionMode = modeInfo?.executionMode || 'DESKTOP'; // Use 'DESKTOP' as default if mode is not defined
            console.log('Execution Mode Info:', modeInfo); // Log the complete mode information
            console.log('Determined Execution Mode:', executionMode);
        } catch (error) {
            console.error('Failed to get execution mode:', error);
            executionMode = 'DESKTOP'; // Fallback to 'DESKTOP' on error
        }
        filterWebonList();
        window.scrollTo(0, 0); // Scroll to the top
    });

    function shouldBeShown(platform) {
        // Log the platform object for clarity
        console.log(`Platform Data: mobile - ${platform.mobile}, hub - ${platform.hub}, desktop - ${platform.desktop}`);

        // Check the current environment
        const onMobileBrowser = isMobileBrowser();
        console.log(`Current Environment: mobile - ${onMobileBrowser}, executionMode - ${executionMode}`);

        // Logic to determine if the webon should be shown
        if (onMobileBrowser) { // Mobile environment
            return platform.mobile;
        } else if (executionMode === 'HUB') { // HUB environment
            return platform.hub;
        } else { // Desktop or undefined environment
            return platform.desktop;
        }
    }
    // Function to filter the webon list
    function filterWebonList() {
        let foundMatchingWebon = false; // If any matching webon is found
        $data.filteredList = $data.webonList.filter(webon => {
            console.log(`Checking Webon: ${webon.name}`, webon);
            const isPublic = webon.public; // Checking if the webon is public
            const isTrusted = webon.trusted; // Checking if the webon is trusted

            // Checking if webon name, tags, slogan, or domain matches search query
            const matchesSearchQuery = webon.name.toLowerCase().includes(searchQuery.toLowerCase());
            const tagMatchesSearchQuery = webon.tags?.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));
            const sloganMatchesSearchQuery = webon.slogan?.toLowerCase().includes(searchQuery.toLowerCase());
            const domainMatchesSearchQuery = webon.domain?.toLowerCase().includes(searchQuery.toLowerCase());
            // Checking if webon tag matches selected tag
            const matchesTag = webon.tags?.some(tag => tag.name.toLowerCase() === selectedTagName.toLowerCase());

            // Checking if webon is compatible with platform
            const isPlatformCompatible = shouldBeShown(webon.platform);
            console.log(`Webon: ${webon.name}, Trusted: ${isTrusted}, Platform Compatible: ${isPlatformCompatible}`);

            // Checking if the webon matches the criteria
            const itemMatches = isPlatformCompatible &&
                (isTrusted || matchesSearchQuery || tagMatchesSearchQuery || sloganMatchesSearchQuery || domainMatchesSearchQuery) &&
                (!selectedTagName || matchesTag);
            if (itemMatches) foundMatchingWebon = true;
            return itemMatches; // Whether the webon matches the criteria
        });
        return foundMatchingWebon; // Whether any matching webon is found
    }

    // To clear selected tag
    function clearSelectedTag() {
        selectedTag.set(""); // Setting selected tag to an empty string
        selectedTagName = ""; // Clearing selected tag name
    }

    // To capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1); // Capitalizing the first letter of the string
    }

    // To filter webon list based on search query and selected tag
    $: if (searchQuery) {
        const foundMatchingWebon = filterWebonList(); // Filtering webon list based on search query
        if (!foundMatchingWebon) clearSelectedTag(); // Clearing selected tag if no matching webon is found
    } else {
        filterWebonList(); // Filtering webon list if there is no search query
    }


    // To groups Webons by their tags
    function groupWebonsByTag() {
        let groups = new Map();
        $data.filteredList.forEach(webon => {
            if (webon.tags && webon.tags.length > 0) {
                webon.tags.forEach(tag => {
                    if (!groups.has(tag.name)) {
                        groups.set(tag.name, []);
                    }
                    groups.get(tag.name).push(webon);
                });
            } else { //  untagged Webons
                const untagged = "Untagged";
                if (!groups.has(untagged)) {
                    groups.set(untagged, []);
                }
                groups.get(untagged).push(webon);
            }
        });
        webonGroups = Array.from(groups, ([tagName, webons]) => ({ tagName, webons }));
    }

    // To update whenever the filtered list changes
    $: $data.filteredList, groupWebonsByTag();
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
    {#each webonGroups as group}
        <div class="tag-header">
            <h2>{group.tagName}</h2>
        </div>
        {#each group.webons as webon}
            <WebonElement {webon} />
        {/each}
    {/each}
</div>


<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 10px;
    justify-content: center;
  }
  .tag-header {
    grid-column: 1 / -1;
    text-align: left;
    padding: 20px;
    color: var(--nomoForeground1);
    background-color: var(--nomoBackground1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 25px;
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
    color: black;
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
  @media (max-width: 768px) {
    .container {
      grid-template-columns: repeat(2, 1fr);

    }
  }

  @media (max-width: 480px) {
    .container {
      grid-template-columns: 1fr;

    }
  }
</style>