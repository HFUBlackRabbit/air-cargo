<template>
  <div :class="[['input-field'], ...containerClass]">
    <select class="icons"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value || null)"
    >
      <option :value="null" :selected="modelValue === null"></option>
      <option v-for="[key, item] of options" :value="key" :key="key">{{ item.toString() }}</option>
    </select>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "v-select",
  props: {
    containerClass: Array,
    label: String,
    options: Map,
    modelValue: {
      default: null
    }
  }
}
</script>>