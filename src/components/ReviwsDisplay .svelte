
<script>
    let reviews = [
        { text: 'Great, loved it!', rating: 4 },
        { text: 'Helpful tool with interesting features.', rating: 5 }
    ];
</script>

{#each reviews as review, index (index)}
    <div class="review">
        <p>{review.text}</p>
        <div class="rating">Rating: {review.rating} / 5</div>
    </div>
{/each}

<style>
    .reviews-display {
        margin: 2rem 0;
    }

    .review {
        background-color: #f9f9f9;
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
    }

    .review p {
        margin: 0.5rem 0;
        line-height: 1.4;
    }

    .review .rating {
        font-weight: bold;
        color: #333;
    }
</style>