<template>
  <div class="form-check" :class="getClasses(isHorizontal, datas.length)" v-for="data in datas" v-bind:key="data">
    <input class="form-check-input"
     type="radio" 
     :name="name" 
     :id="data.id" 
     :checked="data.checked" 
     :value="data.value" 
     @change="$emit('change', $event)"
     @input="$emit('update:modelValue', $event.target.value)"/>
    <label :for="data.id" class="form-label" v-if="data.lable">{{data.lable}}</label>
  </div>
</template>

<script>
export default {
  name: "parking-radio",
  props: {
    name: String,
    id: String,
    datas: {
      type: Array,
      default: () => [],
    },
    isHorizontal: {
      type: Boolean,
      default: false,
    }
  },

  methods: {
    getClasses(isHorizontal, size) {
      return isHorizontal ? `col-${12 / size}` : ''
    }
  }
};
</script>
<style lang="scss" scoped>
.form-check {
  .form-check-input {
    cursor: pointer;
  }
  .form-label {
    cursor: pointer;
  }
}
</style>