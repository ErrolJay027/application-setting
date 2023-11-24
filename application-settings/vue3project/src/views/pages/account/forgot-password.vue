<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

/**
 * Forgot Password component
 */
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      title: "Recoverpwd",
      tryingToReset: false
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    tryToReset() {
      this.submitted = true;
      const auth = process.env.VUE_APP_DEFAULT_AUTH;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        if (auth === "firebase") {
          this.tryingToReset = true;
          // Reset the authError if it existed.
          this.error = null;
          return this.$store
            .dispatch("auth/resetPassword", {
              email: this.email
            })
            .then((token) => {
              console.log("token", token);
              setTimeout(() => {
                this.tryingToReset = false;
                this.isResetError = false;
              }, 2000);
            })
            .catch((error) => {
              this.tryingToReset = false;
              this.error = error ? error : "";
              this.isResetError = true;
            });
        } else if (auth === "fakebackend") {
          this.tryingToReset = true;
        }
      }
    }
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
                  alt
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="@/assets/images/logo-light.png"
                  alt
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
                      v-if="tryingToReset"
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
                          v-model="email"
                          class="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          :class="{
                            'is-invalid': submitted && v$.email.$error
                          }"
                        />
                        <div
                          v-if="submitted && v$.email.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="v$.email.required.$invalid"
                            >Email is required.</span
                          >
                          <span v-if="v$.email.email.$invalid"
                            >Please enter valid email.</span
                          >
                        </div>
                      </div>
                      <BRow class="mb-0">
                        <BCol class="col-12 text-end">
                          <BButton
                            class="btn btn-primary w-sm"
                            @click="tryToReset"
                          >
                            Reset
                          </BButton>
                        </BCol>
                      </BRow>
                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          Remember It ?
                          <router-link
                            to="/login"
                            class="fw-medium text-primary"
                            >Signin</router-link
                          >
                        </p>
                      </div>
                    </form>
                  </div>
                </BCardBody>
                <!-- end card-body -->
              </BCard>
              <!-- end card -->

              <div class="mt-5 text-center">
                <p>
                  © {{ new Date().getFullYear() }} Minible. Crafted with
                  <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </div>
            <!-- end col -->
          </BCol>
        </BRow>
      </BContainer>
    </div>
    <!-- end row -->
  </div>
</template>
