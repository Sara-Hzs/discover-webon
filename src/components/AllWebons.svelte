<script>
    import { data } from "../stores/data.js";
    import WebonElement from "./WebonElement.svelte";
</script>

<div class="outer-container">
    <div class="container">
        {#each $data.filteredList as webon}
            <WebonElement {webon} />
        {/each}
    </div>
</div>

<style lang="scss">
  .outer-container {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    @media (max-width: 768px) {
      padding: 0;
      margin: 10px 0;

    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    margin: 0 auto;
  }
</style>
