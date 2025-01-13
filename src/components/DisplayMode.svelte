<script>
    import { slide } from 'svelte/transition';

    export let displayMode;
    export let showCategoryDropdown;
    export let toggleShowCategoryDropdown;
    export let setDisplayMode;
</script>

<div class="filter-section">
    <div class="category">
        <h1>Display Mode</h1>
        <div class="dropdown">
            <button class="dropdown-toggle" on:click={toggleShowCategoryDropdown}>
                {displayMode}
                <span class="arrow" class:rotate={showCategoryDropdown}>▼</span>
            </button>

            {#if showCategoryDropdown}
                <div class="dropdown-menu" transition:slide|local={{ duration: 200 }}>
                    {#each ['All WebOns', 'Categorized'] as option}
                        <button
                                on:click={() => {
                setDisplayMode(option);
              }}
                                class:active={displayMode === option}
                        >
                            {option}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
  .filter-section {

    padding-bottom: 10px;
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

  .dropdown {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
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

    @media (max-width: 768px) {
      font-size: 0.875rem;
      padding: 6px 10px;
    }

    &:hover {
      background: #333;
    }
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
    @media (max-width: 768px) {
      font-size: 0.875rem;
      padding: 6px 10px;
    }
    &:hover {
      background: rgba(156, 99, 238, 0.2);
      color: #fff;
    }
    &.active {
      background: #9c63ee;
      color: white;
    }
    &.active:hover {
      background: #8852d9;
    }
    & + button {
      border-top: 1px solid rgba(255, 255, 255, 0.03);
    }
  }

  .arrow {
    transition: transform 0.2s ease;
    margin-left: 5px;
  }
  .arrow.rotate {
    transform: rotate(180deg);
  }
</style>
