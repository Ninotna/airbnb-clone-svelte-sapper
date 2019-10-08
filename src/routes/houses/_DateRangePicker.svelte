<script>
import Datepicker from '../../lib/svelte-calendar-1.0.10/src/Components/Datepicker.svelte'
</script>

<style>
.date-range-picker-container {
  border: 1px solid #ddd;
  display: grid;
  grid-template-columns: 40% 20% 40%;
  padding: 10px;
}
</style>

<div class="date-range-picker-container">
  <Datepicker>
    <div class="check-in">Check-in</div>
  </Datepicker>
  <div class="arrow">➡️</div>
  <Datepicker>
    <div class="check-out">Checkout</div>
  </Datepicker>
</div>
