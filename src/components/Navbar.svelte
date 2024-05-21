
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
        background-color: #000;
        padding: 1rem 0;
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
        font-size: calc(0.8rem + 0.5vw);
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
        .navbar-toggle {
            display: block;
            margin-left: auto;
        }

        .navbar ul {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            width: 80%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 1000;
        }

        .navbar ul li {
            padding: 1rem;
            border-bottom: 0.5px solid #ccc;
        }

        .navbar ul.open {
            display: flex;
            animation: slideDown 0.3s ease-out forwards;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
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