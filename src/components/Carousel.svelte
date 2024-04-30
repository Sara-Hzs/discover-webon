<script>
    import { onMount } from 'svelte';
    import EmblaCarousel from 'embla-carousel';
    import { data } from "../stores/data.js"; 

    let embla;
    let viewport;

    onMount(() => {

        if (viewport) {
            embla = new EmblaCarousel(viewport, {
                loop: false,
                align: 'start',
                containScroll: 'trimSnaps',
                draggable: true,
                slidesToScroll: 1,
                slidesToShow: 3
            });
        }
    });


    $: webons = $data.filteredList;
</script>

<div bind:this={viewport} class="embla">
    <div class="embla__container">
        {#each webons as webon}
            <div class="embla__slide">
                <div class="webon-card">
                    <img src={webon.icon} alt={`Icon of ${webon.name}`}>
                    <div class="webon-info">
                        <h4>{webon.slogan}</h4>
                        <p>{webon.domain}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<button on:click={() => embla.scrollPrev()}>Prev</button>
<button on:click={() => embla.scrollNext()}>Next</button>

<style>
    .embla {
        overflow: hidden;
    }
    .embla__container {
        display: flex;
    }
    .embla__slide {
        flex: 0 0 33.333%; /* Each slide takes up one-third of the container */
        box-sizing: border-box; /* Include padding and borders in the element's total width and height */
        padding: 10px;
    }
    .webon-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 600px) {
        .embla__slide {
            flex: 0 0 100%;
        }
    }
</style>