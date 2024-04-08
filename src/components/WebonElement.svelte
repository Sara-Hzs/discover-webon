<script>
    import {onMount} from "svelte";
    import { fetchWebons } from '../api/mock-api.js';

    let webons = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            webons = await fetchWebons();
        } catch (e) {
            error = 'Failed to fetch webons.';
            console.error(e);
        }
        loading = false;
    });
</script>


{#if loading}
    <p>Loading...</p>
{:else if error}
    <p>{error}</p>
{:else}
    <div class="webons-container">
        {#each webons as webon}
            <div class="webon" on:click={() => window.open(webon.download_link, '_blank')}>
                <img class="icon" src={webon.icon} alt={webon.name} />
                <div class="content">
                    <h2>{webon.name}</h2>
                    <p class="slogan">{webon.slogan}</p>

                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .webons-container {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: flex-start;
        flex-direction: column;

    }

    .webon {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        width: calc(33.333% - 20px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: box-shadow 0.3s ease;
    }

    .webon:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .icon {
        width: 100%;
        max-width: 120px;
        margin-bottom: 20px;
    }

    .content h2 {
        margin: 0 0 10px;
    }

    .slogan {
        font-style: italic;
        color: #666;
    }
</style>