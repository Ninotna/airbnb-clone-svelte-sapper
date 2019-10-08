<script>
import Datepicker from '../../lib/svelte-calendar-1.0.10/src/Components/Datepicker.svelte'
const dateFormat = '#{l}, #{F} #{j}, #{Y}';

let startDate = new Date()
let endDate = new Date()

const startDateSelectableCallback = date => {
  return true
}
const endDateSelectableCallback = date => {
  return true
}
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
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={startDateSelectableCallback}
    on:dateSelected={e => { startDate = new Date(e.detail.date) }}>
    <div class="check-in">{`${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'long' })}`}</div>
  </Datepicker>
  <div class="arrow">➡️</div>
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={endDateSelectableCallback}
    on:dateSelected={e => { endDate = new Date(e.detail.date) }}>
    <div class="check-in">{`${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'long' })}`}</div>
  </Datepicker>
</div>
