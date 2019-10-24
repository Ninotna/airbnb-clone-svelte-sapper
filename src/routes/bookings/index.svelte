<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`bookings/list.json`)
		const data = await res.json()

		if (res.status === 200) {
			return { bookings: data }
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
export let bookings
</script>

<style>
  h1 {
    padding-bottom: 30px;
  }
  .bookings {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 40px;
  }

  .booking {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 40px;
  }

  .booking img {
    width: 180px;
  }
</style>

<svelte:head>
	<title>Your bookings</title>
</svelte:head>

<div>
  {#if !bookings}
    <h1>No bookings yet</h1>
  {:else}
    <h1>Your upcoming bookings</h1>

    <div class="bookings">
      {#each bookings as booking}
        <div class="booking">
          <img src="{booking.house.picture}" alt="House picture" />
          <div>
            <h2>{booking.house.title} in {booking.house.town}</h2>
            <p>Booked from {new Date(booking.booking.startDate).toDateString()} to  {new Date(booking.booking.endDate).toDateString()}</p>
            <p>
              <a href="/houses/{booking.house.id}">Go to house details</a>
            </p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
