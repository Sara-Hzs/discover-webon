<script>
    export let selectedWebon;
</script>

<article>
    <h1>{selectedWebon.name}</h1>
    <p>{selectedWebon.description}</p>
    <img src={selectedWebon.icon} alt={selectedWebon.name + ' icon'} />
    <img src={selectedWebon.card_image} alt={selectedWebon.name + ' card'} />
    <p>Version: {selectedWebon.version}</p>
    <!-- The rest of your details here -->
</article>