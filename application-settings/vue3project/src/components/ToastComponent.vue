<template>
  <div
    class="position-fixed center p-3"
    style="z-index: 9999; left: 50%; transform: translate(-50%, 0px)"
    :class="position"
  >
    <div
      class="toast align-items-center text-white border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toast"
      :class="options.bgClass"
    >
      <div class="d-flex">
        <div class="toast-body">{{ message }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="close"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";
export default {
  data() {
    return {
      toast: null,
      resolve: null,
      reject: null,
      message: "",

      options: {
        bgClass: "bg-primary",
      },
    };
  },

  props: {
    // bgClass: {
    //   type: String,
    //   default: "bg-primary",
    // },

    position: {
      type: String,
      default: "bottom-0",
    },
  },

  methods: {
    open(data, options = {}) {
      this.message = data.message;

      this.options = Object.assign(this.options, options);

      setTimeout(() => {
        this.toast.show();
      }, 500);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      // this.dialog = false;
      this.toast.hide();
    },
    close() {
      this.resolve(false);
      // this.dialog = false;
      this.toast.hide();
    },
  },

  mounted() {
    this.toast = new Toast(this.$refs.toast);
    // this.toast.show();
  },
};
</script>
