<script>
    import HomePage from "./pages/HomePage/HomePage.svelte";
    import GamePage from "./pages/GamePage/GamePage.svelte";
    import SettingsPage from "./pages/SettingsPage.svelte";
    import ErrorPage from "./pages/ErrorPage.svelte";

    import {
        pageStore,
        HOME_PAGE,
        MAIN_PAGE,
        SETTINGS_PAGE,
    } from "./store/pageStore";
</script>

{#if $pageStore == HOME_PAGE}
    <HomePage />
{:else if $pageStore == MAIN_PAGE}
    <GamePage />
{:else if $pageStore == SETTINGS_PAGE}
    <SettingsPage />
{:else}
    <ErrorPage />
{/if}

<style>
    :global(body) {
        display: grid;
    }
</style>
