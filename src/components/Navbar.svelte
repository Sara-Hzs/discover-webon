
<script>
    import { onMount } from 'svelte';
    import logo from "../assets/logo.svg";

    let isNavOpen = false;


    function toggleNavList() {
        isNavOpen = !isNavOpen;
    }
    onMount(() => {

    });
</script>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0f0f0f;
        padding: 1rem;
        width: 100%;
    }

    .logo {
        display: flex;
        align-items: center;

    }

    .logo img {
        width: auto;
        height: calc(1rem + 2vw);
    }

    .navbar ul {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
        justify-content: flex-end;
        flex: 1;
    }

    .navbar li {
        padding: 0.5rem 1rem;
    }

    .navbar a {
        color: #969595;
        text-decoration: none;
        font-weight: bold;
        font-size: calc(0.7rem + 0.4vw);
    }

    .navbar a:hover {
        color: #ccc;
    }

    .navbar-toggle {
        background-color: #fdfdfd;
        color: #1e1f22;
        border: none;
        display: none;
        font-size: 1rem;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .navbar{
            display: none;
        }
    }

    .navbar a {
        display: block;
    }

    .navbar-toggle {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        background: none;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 8px;
    }
</style>

<nav class="navbar">
    <div class="logo">
        <img src={logo} alt="Logo">
    </div>
    <button class="navbar-toggle" aria-label="Toggle navigation" on:click={toggleNavList}>Menu</button>
    <ul class:open={isNavOpen}>
        <li><a href="#techOverviewContainer">About</a></li>
        <li><a href="#comparisonContainer">Compare</a></li>
        <li><a href="#featuresAdvantagesContainer">Features</a></li>
        <li><a href="https://discover.webon.info/">Discover WebOn</a></li>
    </ul>
</nav>