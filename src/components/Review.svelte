<script>
    import { mockWebonData } from "../stores/mockData.js";

    let newReview = { name: '', rating: 5, comment: '', date: new Date().toISOString() };

    function submitReview() {
        if (!newReview.name || !newReview.rating || !newReview.comment) {
            alert('Please fill out all fields');
            return;
        }
        mockWebonData.addReview(newReview);
        newReview = { name: '', rating: 5, comment: '', date: new Date().toISOString() }; // Reset form
    }

    function sortByDate(order) {
        mockWebonData.reviews = mockWebonData.reviews.sort((a, b) => {
            return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
        });
    }

    function sortByRating(order) {
        mockWebonData.reviews = mockWebonData.reviews.sort((a, b) => {
            return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        });
    }


    $: displayedReviews = mockWebonData.reviews.slice(0, 2);


 
    let showAll = false;


    function toggleReviewsDisplay() {
        showAll = !showAll;
        displayedReviews = showAll ? mockWebonData.reviews : mockWebonData.reviews.slice(0, 3);
    }


    $: if (showAll) {
        displayedReviews = mockWebonData.reviews;
    } else {
        displayedReviews = mockWebonData.reviews.slice(0, 2);
    }

</script>


<div class="reviews-ratings">
    <div class="ratings">
        <h4>Overall Score: {mockWebonData.overallScore}</h4>
        <p>Total Reviews: {mockWebonData.totalReviews}</p>
        <p>Recommendation: {mockWebonData.recommendationPercent}% of users recommend this.</p>
    </div>

    <div class="features-ratings">
        <h4>Feature Ratings</h4>
        {#each Object.entries(mockWebonData.featuresRatings) as [feature, rating]}
            <p>{feature}: {rating}</p>
        {/each}
    </div>

    <div class="reviews">
        <h4>Reviews</h4>
        <div class="sort-buttons">
            <button on:click={() => sortByDate('asc')}>Oldest First</button>
            <button on:click={() => sortByDate('desc')}>Newest First</button>
            <button on:click={() => sortByRating('asc')}>Lowest Rating</button>
            <button on:click={() => sortByRating('desc')}>Highest Rating</button>
        </div>

        {#each displayedReviews as review}
            <div class="review">
                <p><strong>{review.name}</strong> ({review.date}):</p>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
            </div>
        {/each}
        <!-- Add toggle button here -->
        <button class="show" on:click={toggleReviewsDisplay}>
            {#if showAll}
                Show Less
            {:else}
                Show All
            {/if}
        </button>
    </div>

    <div class="review-form">
        <h4>Leave a Review</h4>
        <input type="text" placeholder="Your Name" bind:value={newReview.name}>
        <input type="number" placeholder="Rating (1-5)" min="1" max="5" bind:value={newReview.rating}>
        <textarea placeholder="Your Comment" bind:value={newReview.comment}></textarea>
        <button on:click|preventDefault={submitReview}>Submit Review</button>
    </div>

</div>




<style lang="scss">
  .reviews-ratings{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background: #f0f4f8;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);


    > div {
      background: #ffffff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

     h4 {
      font-weight: 700;
      padding: 10px;
      margin: 0;
      background: #ad9050;
      color: #ffffff;
      border-radius: 30px;
      text-align: center;
    }

    p {
      padding: 0 20px;
      margin: 10px 0;
    }

    .ratings, .features-ratings {
      padding: 20px;
      background: #ffffff;

    }

    .reviews {
      padding: 20px;
    }

    .review {
      background: #ffffff;
      border: none;
      padding: 20px;
      margin: 10px 0;
      border-radius: 10px;

      p {
        position: relative;
        padding-left: 30px;
        &:before {
          content: '“';
          font-family: Georgia, serif;
          position: absolute;
          left: 10px;
          top: -10px;
          font-size: 24px;
          color: #ad9050;
        }
        &:after {
          content: '”';
          font-family: Georgia, serif;
          position: absolute;
          right: 10px;
          bottom: -10px;
          font-size: 24px;
          color: #ad9050;
        }
        &.review-date {
          background: #f0f4f8;
          display: inline-block;
          padding: 3px 8px;
          border-radius: 5px;
          font-size: 14px;
          color: #666;
        }
      }

    }
    .show {
      display: block;
      width: auto;
      padding: 5px 20px;
      margin: 10px auto;
      color: white;
      font-size: 15px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
      background: linear-gradient(45deg, #efcc80, #ad9050);
      border-radius: 30px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      &:hover {
        background: linear-gradient(45deg, #ad9050, #efcc80);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      }
    }

    .review-form {
      padding: 20px;
      background: #ffffff;

      h4 {
        color: #fdfdfd;
        margin-bottom: 20px;
      }
      input, textarea {
        width: calc(100% );
        padding: 12px;
        margin-bottom: 20px;
        border-radius: 20px;
        border: 2px solid #ad9050;
        font-size: 16px;
        &:focus {
          border-color: #ad9050;
          outline: none;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.25);
        }
      }
      textarea {
        height: 120px;
        resize: none;
      }
      button {
        display: block;
        width: auto;
        padding: 5px 20px;
        margin: 10px auto;
        color: white;
        font-size: 15px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        background: linear-gradient(45deg, #efcc80, #ad9050);
        border-radius: 30px;
        box-shadow: 0 4px 14px rgba(0,0,0,0.1);
        &:hover {
          background: linear-gradient(45deg, #ad9050, #efcc80);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
      }
      }
    }


  @media (max-width: 500px) {
    .reviews-ratings {
      grid-template-columns: 1fr;
    }
  }
</style>