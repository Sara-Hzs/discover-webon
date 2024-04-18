<script>
    import { mockWebonData } from "../stores/mockData.js";
    import { slide, fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

    let newReview = writable({ name: '', rating: 0, comment: '', date: new Date().toISOString(), email: '' });
    let submissionMessage = writable('');
    let termsAccepted = false;
    let rating = 0;


    function setRating(value) {
        $newReview.rating = value;
        rating = value;
    }

    function displayMessage(message) {
        submissionMessage.set(message);
        setTimeout(() => submissionMessage.set(''), 3000);
    }

    function submitReview() {
        const review = $newReview;

        if (!review.name || review.rating <= 0 || !review.comment || !review.email || !termsAccepted) {
            displayMessage("Please fill all fields.");
            return;
        }

        if (!review.email.includes('@')) {
            displayMessage("Please make sure to put a real email.");
            return;
        }


        mockWebonData.reviews.push(review);
        newReview.set({ name: '', rating: 0, comment: '', date: new Date().toISOString(), email: '' });
        termsAccepted = false;
        rating = 0;
        displayMessage("Thanks for your rating!");
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
        <div class="recommendation-bar">
            <div class="recommendation-fill" style="width: {mockWebonData.recommendationPercent}%;">
            </div>
        </div>
        <p class="recommendation-percent">{mockWebonData.recommendationPercent}% of users recommend this.</p>
    </div>

    <div class="features-ratings">
        <h4>Feature Ratings</h4>
        {#each Object.entries(mockWebonData.featuresRatings) as [feature, rating]}
            <div class="feature">
                <p>{feature}</p>
                <div class="rating-bar-container">
                    <div class="rating-bar" style="width: {rating / 5 * 100}%;">
                        <span class="rating">{rating}</span>
                    </div>
                </div>
            </div>
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
            <div class="review" in:slide|local={{duration: 300}} out:slide|local={{duration: 300}}>
                <p><strong>{review.name}</strong> </p>
                <p>Date: {review.date}</p>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
            </div>
        {/each}

        <button class="show" on:click={toggleReviewsDisplay}>
            {#if showAll}
                Show Less
            {:else}
                Show All
            {/if}
        </button>
    </div>
<div>
    <h4>Leave a Review</h4>
    <form class="review-form">
<div class="star-container">
    <div class="star-rating">
        {#each [1, 2, 3, 4, 5] as star}
            <span on:click={() => setRating(star)} class:filled={rating >= star}>★</span>
        {/each}
    </div>
</div>


        <input type="text" bind:value={$newReview.name} placeholder="Full Name" class="name">
        <input type="email" bind:value={$newReview.email} placeholder="Email" class="email">
        <textarea bind:value={$newReview.comment} placeholder="Review" class="review"></textarea>

        <div class="terms">
            <input type="checkbox" id="terms" bind:checked={termsAccepted}>
            <label for="terms">I accept the terms and conditions of submitting the review</label>
        </div>
        <button type="button" class="submit-btn" on:click={submitReview}>Rate product</button>
        <br><br>
        {#if $submissionMessage}
            <p>{$submissionMessage}</p>
        {/if}
    </form>
</div>


</div>




<style lang="scss">


  .reviews-ratings {
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

    .features-ratings {

      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

    }


    .feature {
      margin-bottom: 10px;
    }

    .rating-bar-container {
      background: #e7e7e7;
      border-radius: 15px;
      overflow: hidden;
      height: 20px;
      position: relative;
    }

    .rating-bar {
      background: linear-gradient(90deg, #bdfacd 0%, #038825 100%);
      height: 100%;
      border-radius: 15px;
      text-align: right;
      transition: width 0.5s ease-in-out;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
    }

    .rating {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 2px 6px;
      font-weight: bold;
      color: #333;

    }

    .ratings {
      padding: 20px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      text-align: center;
    }


    .recommendation-bar {
      background: #e7e7e7;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      height: 20px;
      margin: 10px 0;
    }

    .recommendation-fill {
      background: linear-gradient(90deg, #bdfacd 0%, #038825 100%);
      height: 100%;
      border-radius: 15px;
      text-align: right;
      transition: width 0.5s ease-in-out;
      position: absolute;
    }

    .recommendation-percent {
      font-weight: bold;
      color: #018325;
    }

    .reviews {
      padding: 20px;
    }

    .sort-buttons {
      text-align: center;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    .sort-buttons button {
      color: #333;
      border: 1px solid #ccc;
      border-radius: 15px;
      padding: 5px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-right: 4px;

    }

    .sort-buttons button:hover {
      background-color: #e2e6ea;
    }

    .sort-buttons button:last-child {
      margin-right: 0;
      margin-top: 5px;
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
        word-wrap: break-word;

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
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

      &:hover {
        background: linear-gradient(45deg, #ad9050, #efcc80);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }

    .review-form {
      background: #ffffff;
      border: none;
      padding: 20px;
      margin: 10px 0;
      border-radius: 10px;



      .headline, .review, .name, .email {
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid grey;
        border-radius: 4px;
        padding: 10px;
      }

      .file-upload {
        margin-bottom: 10px;

        .file-upload-label {
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
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

          &:hover {
            background: linear-gradient(45deg, #ad9050, #efcc80);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          }
        }

        input[type="file"] {
          display: none;
        }
      }

      .terms {
        margin-bottom: 10px;
        margin-top: 20px;
        display: flex;
        align-items: center;

        label {
          margin-left: 10px;
        }
      }

      .submit-btn {
        display: block;
        width: auto;
        padding: 5px 20px;
        margin: 30px auto;
        color: white;
        font-size: 15px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        background: linear-gradient(45deg, #efcc80, #ad9050);
        border-radius: 30px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);

        &:hover {
          background: linear-gradient(45deg, #ad9050, #efcc80);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      }
    }

    .star-container {
      text-align: center;
    }
    .star-rating {
      unicode-bidi: bidi-override;
      color: #c5c5c5;
      cursor: pointer;
      font-size: 3rem;
      line-height: 1;
      display: inline-block;
      margin:1rem 0;
    }
    .star-rating span {
      display: inline-block;
      position: relative;
      transition: color 0.2s ease-in-out;
    }
    .star-rating .filled {
      color: #ffc700;
      text-shadow: 0 0 5px #ffc700;
    }

    .star-rating span:hover,
    .star-rating span:hover ~ span {
      color: #c5c5c5 !important;
    }

    .star-rating span:hover:before,
    .star-rating .filled:hover ~ span:before {
      content: '★';
      position: absolute;
      left: 0;
      color: #ffc700 !important;
      text-shadow: 0 0 5px #ffc700;
    }
  }

  @media (max-width: 500px) {
    .reviews-ratings {
      grid-template-columns: 1fr;
    }
  }
</style>