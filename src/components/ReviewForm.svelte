
<script>

    let reviewText = '';
    let rating = 0;


    function submitReview() {
        console.log('Review submitted with text:', reviewText, 'and rating:', rating);
        reviewText = '';
        rating = 0;
    }
</script>

<div class="review-form">
    <textarea bind:value={reviewText} placeholder="Leave a review..."></textarea>
    <div class="rating">
        <label for="rating">Rating:</label>
        <input type="number" id="rating" min="0" max="5" bind:value={rating} />
    </div>
    <button on:click={submitReview}>Submit Review</button>
</div>

<style>
    .review-form {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .review-form textarea {
        width: 100%;
        padding: 0.8rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
        min-height: 100px;
    }

    .review-form .rating {
        display: flex;
        align-items: center;
    }

    .review-form .rating input {
        margin-left: 0.5rem;
        width: 3rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
    }

    .review-form button {
        width: fit-content;
        padding: 0.8rem 1.6rem;
        font-size: 1rem;
        background-color: #4CAF50; /* Change to match your brand color */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .review-form button:hover {
        background-color: #45a049;
    }
</style>