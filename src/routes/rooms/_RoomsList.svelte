<script>
  import Room from './_Room.svelte'
  import rooms from './_rooms.js';
</script>

<style>
  .rooms {
    display: grid;
    grid-template-columns: 400px 400px 400px;
    grid-template-rows: 300px 300px;
    grid-gap: 40px;
  }
</style>

<div>
	<h2>Places to stay</h2>

  <div class="rooms">
  {#each rooms as room}
    <Room {...room} />
  {/each}
  </div>
</div>
