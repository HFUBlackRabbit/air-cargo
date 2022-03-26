<template>
  <div :class="[['switch'], ...switchClass]">
    <label>
      {{ label }}
      <input type="checkbox"
             :value="modelValue"
             @input='$emit("update:modelValue", $event.target.checked)'
      >
      <span class="lever"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "v-checkbox",
  props: {
    switchClass: Array,
    label: String,
    modelValue: Boolean
  }
}
</script>