<script>
  import axios from 'axios'
  import { goto } from '@sapper/app'

  let houseTypes = [
    'Entire house',
    'Room'
  ]

	let house = {}

	const submit = async () => {
    try {
      const response = await axios.post('host/new', { house })
      if (response.data.status === 'error') {
        if (response.data.message === 'SequelizeValidationError') {
          alert('Validation error')
        } else {
          alert(response.data.message)
        }
        return
      }

      goto('/host')
    } catch (error) {
      if (error.response && error.response.data.message === 'SequelizeValidationError') {
        alert('Validation error')
      } else {
        alert(error.response.data.message)
      }
      return
    }
  }
</script>

<style>
  form p {
    display: grid;
  }

  .grid {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .grid > div {
    padding: 50px;
  }
</style>

<h1>Add a new house</h1>
<div>
  <form on:submit|preventDefault={submit}>
    <p>
      <label>House title</label>
      <input required bind:value={house.title} type="text" placeholder="House title" />
    </p>
    <p>
      <label>Town</label>
      <input required bind:value={house.town} type="text" placeholder="Town" />
    </p>
    <p>
      <label>Price per night</label>
      <input required bind:value={house.price} type="number" placeholder="Price per night" />
    </p>
    <p>
      <label>House picture URL</label>
      <input required bind:value={house.picture} type="text" placeholder="House picture URL" />
    </p>
    <p>
      <label>House description</label>
      <textarea required bind:value={house.description}></textarea>
    </p>

    <div class="grid">
      <div>
        <p>
          <label>Number of guests</label>
          <input required bind:value={house.guests} type="number" placeholder="Number of guests" />
        </p>
        <p>
          <label>Number of bedrooms</label>
          <input required bind:value={house.bedrooms} type="number" placeholder="Number of bedrooms" />
        </p>
        <p>
          <label>Number of beds</label>
          <input required bind:value={house.beds} type="number" placeholder="Number of beds" />
        </p>
        <p>
          <label>Number of baths</label>
          <input required bind:value={house.baths} type="number" placeholder="Number of baths" />
        </p>
      </div>

      <div>
        <p>
          <label>Does it have Wifi?</label>
          <select bind:value={house.wifi}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </p>
        <p>
          <label>Does it have a kitchen?</label>
          <select bind:value={house.kitchen}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </p>
        <p>
          <label>Does it have heating?</label>
          <select bind:value={house.heating}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </p>
        <p>
          <label>Does it have free parking?</label>
          <select bind:value={house.freeParking}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </p>
        <p>
          <label>Is it the entire place?</label>
          <select bind:value={house.entirePlace}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </p>
        <p>
          <label>Type of house</label>
          <select bind:value={house.type}>
            {#each houseTypes as item}
              <option value={item}>
                {item}
              </option>
            {/each}
          </select>
        </p>
      </div>
    </div>

    <button class="styled">Add house</button>
  </form>
</div>
