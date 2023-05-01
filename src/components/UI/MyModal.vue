<template>
  <div class="modal" v-if="show" @click.stop="hideModal">
    <div @click.stop class="dialog-content">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    },
    methods: {
        hideModal() {
        this.$emit("update:show", false)
    }
  }
};
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
}

.dialog-content {
    margin: auto;
    background-color: grey;
    border-radius: 15px;
    min-height: 50px;
    min-width: 400px;
    padding: 30px;
}
</style>
