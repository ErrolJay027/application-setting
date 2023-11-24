<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

/**
 * Register component
 */
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      submitted: false,
      tryingToRegister: false,
      isRegisterError: false,
      title: "Register"
    };
  },
  validations: {
    user: {
      username: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    }
  },
  mounted() {
    document.body.classList.add("authentication-bg");
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToRegister = true;
          // Reset the regError if it existed.
          this.regError = null;
          return this.$store
            .dispatch("auth/register", {
              email: this.user.email,
              password: this.user.password
            })
            .then((token) => {
              console.log("token", token);
              this.tryingToRegister = false;
              this.isRegisterError = false;
              this.registerSuccess = true;
              if (this.registerSuccess) {
                this.$router.push(
                  this.$route.query.redirectFrom || {
                    path: "/"
                  }
                );
              }
            })
            .catch((error) => {
              this.tryingToRegister = false;
              this.regError = error ? error : "";
              this.isRegisterError = true;
            });
        } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
          const { email, username, password } = this.user;
          if (email && username && password) {
            this.$store.dispatch("authfack/registeruser", this.user);
          }
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
                  <h5 class="text-primary">Register Account</h5>
                  <p class="text-muted">Get your free Minible account now.</p>
                </div>
                <div class="p-2 mt-4">
                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <BForm>
                    <BFormGroup
                      id="email-group"
                      label="Username"
                      class="mb-3"
                      label-for="username"
                    >
                      <BFormInput
                        id="username"
                        v-model="user.username"
                        type="text"
                        placeholder="Enter username"
                        :class="{
                          'is-invalid': submitted && v$.user.username.$error
                        }"
                      ></BFormInput>
                      <div
                        v-if="submitted && v$.user.username.required.$invalid"
                        class="invalid-feedback"
                      >
                        Username is required.
                      </div>
                    </BFormGroup>

                    <BFormGroup
                      id="fullname-group"
                      label="Email"
                      label-for="email"
                      class="mb-3"
                    >
                      <BFormInput
                        id="email"
                        v-model="user.email"
                        type="email"
                        placeholder="Enter email"
                        :class="{
                          'is-invalid': submitted && v$.user.email.$error
                        }"
                      ></BFormInput>
                      <div
                        v-if="submitted && v$.user.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="v$.user.email.required.$invalid"
                          >Email is required.</span
                        >
                        <span v-if="v$.user.email.email.$invalid"
                          >Please enter valid email.</span
                        >
                      </div>
                    </BFormGroup>

                    <BFormGroup
                      id="password-group"
                      label="Password"
                      class="mb-3"
                      label-for="password"
                    >
                      <BFormInput
                        id="password"
                        v-model="user.password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && v$.user.password.$error
                        }"
                      ></BFormInput>
                      <div
                        v-if="submitted && v$.user.password.required.$invalid"
                        class="invalid-feedback"
                      >
                        Password is required.
                      </div>
                    </BFormGroup>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-terms-condition-check"
                      />
                      <label
                        class="form-check-label"
                        for="auth-terms-condition-check"
                        >I accept
                        <a href="javascript: void(0);" class="text-dark"
                          >Terms and Conditions</a
                        ></label
                      >
                    </div>
                    <div class="mt-3 text-end">
                      <BButton
                        variant="primary"
                        class="w-sm"
                        @click="tryToRegisterIn"
                        >Register</BButton
                      >
                    </div>

                    <!-- <div class="mt-4 text-center">
                      <div class="signin-other-title">
                        <h5 class="font-size-14 mb-3 title">Sign up using</h5>
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
                      <p class="text-muted mb-0">
                        Already have an account ?
                        <router-link to="/login" class="fw-medium text-primary"
                          >Login</router-link
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
              <p>
                © {{ new Date().getFullYear() }} S2S Internet.
              </p>
            </div>
          </BCol>
          <!-- end col -->
        </BRow>
      </BContainer>
    </div>
    <!-- end row -->
  </div>
</template>
