<script>
    import reload from '../assets/reload_black.svg'
</script>

<div class="reload" on:click={() => {
    location.reload()
}}>
    <img src={reload} alt="">
</div>

<style lang="scss">
    .reload {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      img {
        width: 50px;
        height: 50px;
      }
    }
</style>