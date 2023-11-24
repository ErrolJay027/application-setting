<script>
// import { layoutMethods } from "@/state/helpers";

/**
 * Right sidebar component
 */
export default {
  computed: {
    layoutData() {
      return this.$store.state.layout ? this.$store.state.layout : {};
    },
    layout: {
      get() {
        return this.layoutData.layoutType;
      },
      set(newVal) {
        this.$store.dispatch("layout/changeLayoutType", {
          layoutType: newVal
        });
      }
    },
    width: {
      get() {
        return this.layoutData.layoutWidth;
      },
      set(newVal) {
        this.$store.dispatch("layout/changeLayoutWidth", {
          layoutWidth: newVal
        });
      }
    },
    topbar: {
      get() {
        return this.layoutData.topbar;
      },
      set(newVal) {
        this.$store.dispatch("layout/changeTopbar", {
          topbar: newVal
        });
      }
    },
    sidebarType: {
      get() {
        return this.layoutData.leftSidebarType;
      },

      set(newVal) {
        this.$store.dispatch("layout/changeLeftSidebarType", {
          leftSidebarType: newVal
        });
      }
    },
    mode: {
      get() {
        const mode = this.layoutData.mode;
        document.body.setAttribute("data-bs-theme", mode);
        return this.layoutData.mode;
      },

      set(newVal) {
        this.$store.dispatch("layout/changeLayoutMode", {
          mode: newVal
        });
        this.$store.dispatch("layout/changeLeftSidebarType", {
          leftSidebarType: newVal
        });
        this.$store.dispatch("layout/changeTopbar", {
          topbar: newVal
        });
        document.body.setAttribute("data-bs-theme", newVal);
      }
    }
  },
  mounted() {
    this.addEventListener();
  },
  methods: {
    addEventListener() {
      document.body.addEventListener("click", this.hideRightBar);
    },
    hideRightBar(event) {
      const classes = event.target.classList;

      if (classes.contains("rightbar-overlay")) {
        this.$parent.hideRightSidebar();
      }
    }
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.hideRightBar);
  }
};
</script>

<template>
  <div>
    <!-- Right Sidebar -->
    <div class="right-bar">
      <div class="h-100" data-simplebar>
        <div class="rightbar-title px-3 py-4">
          <a
            href="javascript:void(0);"
            class="right-bar-toggle float-end"
            @click="hide"
          >
            <i class="mdi mdi-close noti-icon"></i>
          </a>
          <h5 class="m-0">Settings</h5>
        </div>

        <div class="p-4">
          <h6 class="mb-0">Layout</h6>
          <hr class="mt-1" />
          <div class="">
            <BFormRadioGroup
              v-model="layout"
              stacked
              class="right-sidebar-radio-group d-flex"
            >
              <BFormRadio value="vertical" class="mb-1 form-check-sm"
                >Vertical</BFormRadio
              >
              <BFormRadio
                value="horizontal"
                class="mb-1 ms-1 form-check-sm"
                style="margin-right: 8px"
              >
                <span class="mt-2">Horizontal</span>
              </BFormRadio>
            </BFormRadioGroup>
          </div>
          <h6 class="mb-0 mt-4">Layout mode</h6>
          <hr class="mt-1" />
          <div class="">
            <BFormRadioGroup
              v-model="mode"
              stacked
              class="right-sidebar-radio-group d-flex"
            >
              <BFormRadio value="dark" class="mb-1 form-check-sm"
                >Dark</BFormRadio
              >
              <BFormRadio
                value="light"
                class="mb-1 ms-1 form-check-sm"
                style="margin-right: 8px"
              >
                <span class="mt-2">Light</span>
              </BFormRadio>
            </BFormRadioGroup>
          </div>

          <!-- Width -->
          <h6 class="mt-3">Width</h6>
          <hr class="mt-1" />
          <BFormRadioGroup
            class="right-sidebar-radio-group d-flex"
            v-model="width"
            stacked
          >
            <BFormRadio value="fluid" class="mb-1 form-check-sm"
              >Fluid</BFormRadio
            >
            <BFormRadio value="boxed" class="form-check-sm ms-3"
              >Boxed</BFormRadio
            >
          </BFormRadioGroup>

          <!-- Sidebar -->
          <div v-if="layout === 'vertical'">
            <h6 class="mt-3">Sidebar color</h6>
            <hr class="mt-1" />
            <BFormRadioGroup
              v-model="sidebarType"
              stacked
              class="right-sidebar-radio-group"
            >
              <BFormRadio value="dark" class="mb-1 form-check-sm"
                >Dark</BFormRadio
              >
              <BFormRadio value="light" class="mb-1 form-check-sm"
                >Light</BFormRadio
              >
              <BFormRadio value="colored" class="form-check-sm"
                >Colored</BFormRadio
              >
            </BFormRadioGroup>
            <h6 class="mt-3">Sidebar size</h6>
            <hr class="mt-1" />
            <BFormRadioGroup
              v-model="sidebarType"
              stacked
              class="right-sidebar-radio-group"
            >
              <BFormRadio value="default" class="mb-1 form-check-sm"
                >Default</BFormRadio
              >
              <BFormRadio value="compact" class="mb-1 form-check-sm"
                >Compact</BFormRadio
              >
              <BFormRadio value="icon" class="mb-1 form-check-sm"
                >Icon</BFormRadio
              >
            </BFormRadioGroup>
          </div>

          <!-- Topbar -->
          <div v-if="layout === 'horizontal'">
            <h6 class="mt-3">Topbar</h6>
            <hr class="mt-1" />
            <BFormRadioGroup v-model="topbar" stacked>
              <BFormRadio value="dark" class="mb-1 form-check-sm"
                >Dark</BFormRadio
              >
              <BFormRadio value="light" class="mb-1 form-check-sm"
                >Light</BFormRadio
              >
              <BFormRadio value="colored" class="mb-1 form-check-sm"
                >Colored</BFormRadio
              >
            </BFormRadioGroup>
          </div>
        </div>
        <!-- Settings -->
        <hr class="mt-0" />
        <h6 class="text-center mb-0">Choose Layouts</h6>
        <div class="p-4">
          <div class="mb-2">
            <a
              target="_blank"
              href="https://minible-v-light.vuejs.themesbrand.com/"
            >
              <img
                src="@/assets/images/layouts/layout-1.jpg"
                class="img-fluid img-thumbnail"
                alt
              />
            </a>
          </div>
          <div class="mb-2">
            <a
              target="_blank"
              href="https://minible-v-dark.vuejs.themesbrand.com/"
            >
              <img
                src="@/assets/images/layouts/layout-2.jpg"
                class="img-fluid img-thumbnail"
                alt
              />
            </a>
          </div>

          <div class="mb-2">
            <a
              target="_blank"
              href="https://minible-v-rtl.vuejs.themesbrand.com/"
            >
              <img
                src="@/assets/images/layouts/layout-3.jpg"
                class="img-fluid img-thumbnail"
                alt
              />
            </a>
          </div>
        </div>
      </div>
      <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
  </div>
</template>

<style lang="scss">
.right-sidebar-radio-group .form-check {
  margin-bottom: 10px !important;
}
</style>
