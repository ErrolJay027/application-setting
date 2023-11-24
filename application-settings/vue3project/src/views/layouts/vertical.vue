<script>
import router from "@/router";

import Topbar from "@/components/topbar";
import Sidebar from "@/components/side-bar";
import RightSidebar from "@/components/right-sidebar";
import Footer from "@/components/footer";

export default {
  data() {
    return {
      isMenuCondensed: false
    };
  },
  components: {
    Topbar,
    Sidebar,
    RightSidebar,
    Footer
  },
  computed: {
    leftSidebarType() {
      return this.$store?.state?.layout?.leftSidebarType;
    },
    layoutWidth() {
      return this.$store?.state?.layout?.layoutWidth;
    }
  },
  name: "vertical",
  created() {
    document.body.removeAttribute("data-layout");
    document.body.removeAttribute("data-topbar");
  },
  methods: {
    toggleRightSidebar() {
      document.body.classList.toggle("right-bar-enabled");
    },
    hideRightSidebar() {
      document.body.classList.remove("right-bar-enabled");
    },
    toggleMenu() {
      document.body.classList.toggle("sidebar-enable");

      if (window.screen.width >= 992) {
        router.afterEach(() => {
          document.body.classList.remove("sidebar-enable");
          document.body.classList.remove("vertical-collpsed");
        });
        document.body.classList.toggle("vertical-collpsed");
      } else {
        router.afterEach(() => {
          document.body.classList.remove("sidebar-enable");
        });
        document.body.classList.remove("vertical-collpsed");
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    }
  },
  mounted() {}
};
</script>

<template>
  <!-- Begin page -->
  <div id="layout-wrapper">
    <Topbar />
    <Sidebar
      :is-condensed="isMenuCondensed"
      :type="leftSidebarType"
      :width="layoutWidth"
    />
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">
      <div class="page-content">
        <BContainer fluid>
          <slot />
        </BContainer>
      </div>
      <!-- End Page-content -->
      <Footer />
    </div>
    <!-- end main content-->
    <RightSidebar />
  </div>
</template>
