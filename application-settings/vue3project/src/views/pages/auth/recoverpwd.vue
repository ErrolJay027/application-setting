<script>
/**
 * Recover-password component
 */
export default {
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  data() {
    return {
      title: "Recoverpwd"
    };
  }
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol md="8" lg="6" class="col-xl-5">
            <div>
              <router-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="@/assets/images/logo-dark.png"
                  alt=""
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo-light.png"
                  alt=""
                  height="22"
                  class="logo logo-light"
                />
              </router-link>
              <BCard no-body>
                <BCardBody class="p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Reset Password</h5>
                    <p class="text-muted">Reset Password with Minible.</p>
                  </div>
                  <div class="p-2 mt-4">
                    <div
                      class="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      Enter your Email and instructions will be sent to you!
                    </div>
                    <form>
                      <div class="mb-3">
                        <label for="useremail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                        />
                      </div>

                      <div class="mt-3 text-end">
                        <BButton
                          variant="primary"
                          class="w-sm waves-effect waves-light"
                          type="submit"
                        >
                          Reset
                        </BButton>
                      </div>

                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          Remember It ?

                          <router-link
                            to="/auth/login-1"
                            class="fw-medium text-primary"
                            >Signin</router-link
                          >
                        </p>
                      </div>
                    </form>
                  </div>
                </BCardBody>
              </BCard>
              <div class="mt-5 text-center">
                <p>
                  © {{ new Date().getFullYear() }} Minible. Crafted with
                  <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </div>
          </BCol>
        </BRow>
        <!-- end row -->
      </BContainer>
      <!-- end container -->
    </div>
  </div>
</template>
