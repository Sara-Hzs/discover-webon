<script>
    import WebonElement from "./WebonElement.svelte";
    import { slide } from 'svelte/transition';
    import { expandedFolders } from "../stores/expandedFolders.js";

    export let groupedWebons;
    export let INITIAL_ITEMS;
    export let toggleFolder;
</script>

<div class="folders-grid">
    {#each Object.entries(groupedWebons)
        .sort(([tagA], [tagB]) => {
            if (tagA === 'Uncategorized') return 1;
            if (tagB === 'Uncategorized') return -1;
            return tagA.localeCompare(tagB);
        }) as [tag, webons]}
        <div class="folder">
            <div class="folder-header">
                <h2>{tag}</h2>
                <span class="count">{webons.length}</span>
            </div>
            <div class="folder-content" data-folder-content={tag}>
                {#each webons.slice(0, $expandedFolders[tag] ? webons.length : INITIAL_ITEMS) as webon}
                    <div class="webon-card" transition:slide|local>
                        <WebonElement {webon} isInCategorizedView={true} />
                    </div>
                {/each}
                {#if webons.length > INITIAL_ITEMS}
                    <button
                            class="show-more-btn"
                            on:click={() => toggleFolder(tag)}
                            aria-expanded={!!$expandedFolders[tag]}
                    >
                        {$expandedFolders[tag] ? 'Show Less' : 'Show More'}
                    </button>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
  .folders-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 1rem;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: 0.875rem;
      padding:0;
      width: 100%;
    }
  }

  .folder {
    background: rgba(28, 28, 28, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    width: 100%;
    height: min(500px, 80vh);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 900px) {
      height: min(450px, 75vh);
    }
    @media (max-width: 600px) {
      height: min(400px, 70vh);
    }
  }

  .folder-header {
    background: #2a2a2a;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;

    h2 {
      color: white;
      margin: 0;
      font-size: clamp(0.875rem, 1.2vw, 1.2rem);
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .count {
      background: #9c63ee;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: clamp(0.75rem, 1vw, 0.875rem);
      flex-shrink: 0;
      margin-left: 0.5rem;
    }
  }

  .folder-content {
    flex: 1;
    padding: 0.5rem;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    align-content: start;
    overflow-x: hidden;

    @media (max-width: 1010px) {
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #9c63ee;
      border-radius: 4px;
      transition: background 0.2s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #b588f1;
    }

    /* For Firefox */
    scrollbar-width: thin;
    scrollbar-color: #9c63ee rgba(0, 0, 0, 0.2);

  }


  .webon-card {
    width: 100%;
    min-width: 0;
    display: flex;
    margin-bottom: 0.75rem;
  }

  .webon-card :global(.container) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    transform: scale(0.95);
    transform-origin: top left;
  }

  .show-more-btn {
    grid-column: 1 / -1;
    justify-self: center;
    width: clamp(160px, 80%, 200px);
    padding: 0.5rem 1rem;
    background: #1e1e1e;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: clamp(0.75rem, 1vw, 0.875rem);
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    margin-top: 0.5rem;

    &:hover {
      background: #2a2a2a;
    }

    &::after {
      content: "▼";
      font-size: 0.75em;
      transition: transform 0.2s;
    }
    &[aria-expanded="true"]::after {
      transform: rotate(180deg);
    }

    @media (max-width: 600px) {
      width: 100%;
      padding: 0.375rem 0.75rem;
    }
  }

  @media (max-width: 425px) {
    .folder {
      height: auto;
      min-height: auto;
      max-height: 350px;
    }

    .folder-content {
      max-height: 300px;

    }
    .webon-card {
      transition: none;
    }

    .webon-card:hover {
      transform: none !important;
    }

    .webon-card :global(.container) {
      transform: none !important;
    }
  }
</style>



