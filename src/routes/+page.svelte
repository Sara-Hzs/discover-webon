<script>
  import { onMount, afterUpdate, setContext } from "svelte";
  import WebonList from "../components/WebonList.svelte";
  import { data } from "../stores/data.js";
  import webonListTesting from "../assets/webon_list_testing.json";

  let clickCount = 0;
  let showButton = false;
  let passwordStatus = null;

  const handleClick = () => {
    clickCount++;
    if (clickCount >= 10) {
      const enteredPassword = prompt("Please enter the password:");
      const hardcodedPassword = "123";
      if (enteredPassword === hardcodedPassword) {
        showButton = true;
        passwordStatus = "correct";
        handleWebonListChange(webonListTesting);
      } else {
        passwordStatus = "incorrect";
      }
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".page")) {
      handleClick();
    }
  };

  onMount(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  afterUpdate(() => {
    if (showButton) {
      document.removeEventListener("click", handleOutsideClick);
    }
  });

  const handleWebonListChange = (newWebonList) => {
    $data.webonList = newWebonList;
    console.log(data.webonList);
    console.log(newWebonList);
  };
</script>

<div class="page">
  {#if showButton}
    <button class="text-button" on:click={handleClick}>Test WebOns</button>
    {#if passwordStatus === "correct"}
      <p class="password-message correct">Correct password!</p>
    {:else if passwordStatus === "incorrect"}
      <p class="password-message incorrect">Wrong password</p>
    {:else}
      <p class="password-message"></p>
    {/if}
  {/if}
  <WebonList />
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text-button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 8px;
  }

  .password-message {
    margin-top: 8px;
  }

  .correct {
    color: green;
  }

  .incorrect {
    color: red;
  }
</style>
