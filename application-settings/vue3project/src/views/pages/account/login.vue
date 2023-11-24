<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

/**
 * Login component
 */
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "mbstamaria@idss.com.ph",
      password: "09661906023",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      btnLogin: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      this.btnLogin = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        // const { email, password } = this;
        await this.$store
          .dispatch("auth/logIn", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.btnLogin = false;
            console.log("login", response);
            const { login } = response;
            const { roles } = login;
            console.log(roles);
            this.$router.push({ path: roles[0].code }); //roles[0].code is sub url
            // this.$router.push(
            //   this.$route.query.redirectFrom || {
            //     path: "/cs",
            //   }
            // );
          })
          .catch((err) => {
            this.btnLogin = false;
            this.tryingToLogIn = false;
            this.authError = err ? err : "";
            this.isAuthError = true;
            // alert(err);
            // this.$store.dispatch("addSnackbarMessage", err);
            // this.$store.dispatch("addSnackbar", true);
          });

        // if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
        //   this.tryingToLogIn = true;
        //   // Reset the authError if it existed.
        //   this.authError = null;
        //   return this.$store
        //     .dispatch("auth/logIn", {
        //       email: this.email,
        //       password: this.password
        //     })
        //     .then((token) => {
        //       console.log("token", token);
        //       this.tryingToLogIn = false;
        //       this.isAuthError = false;
        //       // Redirect to the originally requested page, or to the home page
        //       this.$router.push(
        //         this.$route.query.redirectFrom || {
        //           path: "/"
        //         }
        //       );
        //     })
        //     .catch((error) => {
        //       this.tryingToLogIn = false;
        //       this.authError = error ? error : "";
        //       this.isAuthError = true;
        //     });
        // } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
        //   const { email, password } = this;
        //   if (email && password) {
        //     this.$store.dispatch("authfack/login", {
        //       email,
        //       password
        //     });
        //   }
        // }
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center">
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
            </div>
          </BCol>
        </BRow>
        <BRow class="align-items-center justify-content-center">
          <BCol md="8" lg="6" class="col-xl-5">
            <BCard no-body>
              <BCardBody class="p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="text-muted">
                    Sign in to continue to S2S Dashboard.
                  </p>
                </div>
                <div class="p-2 mt-4">
                  <div
                    v-if="isAuthError"
                    class="alert alert-danger mt-4 alert-dismissible"
                    role="alert"
                  >
                    {{ authError }}
                  </div>
                  <div
                    v-if="notification.message"
                    class="alert mt-4"
                    :class="'alert-' + notification.type"
                    role="alert"
                  >
                    {{ notification.message }}
                  </div>
                  <BForm>
                    <BFormGroup
                      id="input-group-1"
                      class="mb-3"
                      label="Email"
                      label-for="input-1"
                    >
                      <BFormInput
                        id="input-1"
                        v-model="email"
                        type="text"
                        placeholder="Enter email"
                        :class="{ 'is-invalid': submitted && v$.email.$error }"
                      ></BFormInput>
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
                    </BFormGroup>

                    <BFormGroup id="input-group-2" class="mb-3">
                      <div class="float-end">
                        <router-link to="/forgot-password" class="text-muted"
                          >Forgot password?</router-link
                        >
                      </div>
                      <label for="input-2">Password</label>
                      <BFormInput
                        id="input-2"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && v$.password.$error,
                        }"
                      ></BFormInput>
                      <div
                        v-if="submitted && v$.password.required.$invalid"
                        class="invalid-feedback"
                      >
                        Password is required.
                      </div>
                    </BFormGroup>
                    <!-- <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div> -->
                    <div class="mt-3 text-end">
                      <BButton
                        variant="primary"
                        class="w-sm"
                        @click="tryToLogIn"
                        :loading="btnLogin"
                        :disabled="btnLogin"
                        >Log In</BButton
                      >
                    </div>
                    <!-- <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="font-size-14 mb-3 title">Sign in with</h5>
                      </div>

                      <ul class="list-inline">
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-primary text-white border-primary"
                          >
                            <i class="mdi mdi-facebook"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-info text-white border-info"
                          >
                            <i class="mdi mdi-twitter"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <a
                            href="javascript:void()"
                            class="social-list-item bg-danger text-white border-danger"
                          >
                            <i class="mdi mdi-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div> -->

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Don't have an account ?
                        <router-link
                          to="/register"
                          class="fw-medium text-primary"
                          >Signup now</router-link
                        >
                      </p>
                    </div>
                  </BForm>
                </div>
                <!-- end card-body -->
              </BCardBody>
              <!-- end card -->
            </BCard>
            <div class="mt-5 text-center">
              <p>© {{ new Date().getFullYear() }} S2S Internet.</p>
            </div>
            <!-- end row -->
          </BCol>
          <!-- end col -->
        </BRow>
        <!-- end row -->
      </BContainer>
    </div>
  </div>
</template>

<style lang="scss" module></style>
