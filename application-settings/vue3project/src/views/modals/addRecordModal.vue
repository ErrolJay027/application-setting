<script>
import { Modal } from "bootstrap";
import ToastComponent from "@/components/ToastComponent";
export default {
  components: { ToastComponent },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,

      modal: null,
      form: {
        name: "",
        prod_version: "",
        prod_url: "",
        staging_version: "",
        staging_url: "",
        development_version: "",
        maintenace: "",
        development_url: "",
      },
      action: "ADD",

      selectedRecord: {},
    };
  },
  methods: {
    open(data = {}, action = "ADD") {
      // this.dialog = true

      if (action == "EDIT") {
        this.selectedRecord = data;
        this.form = Object.assign(this.form, data);
      }
      this.action = action;
      this.user = data;
      this.modal.show();
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      // this.dialog = false;
      this.modal.hide();
    },

    cancel() {
      this.resolve(false);
      // this.dialog = false;
      this.modal.hide();
    },

    async onSubmit() {
      const payload = { ...this.form };
      console.log(payload)

      payload.maintenace = (payload.maintenace?.toLowerCase?.() === 'true')

      console.log(payload.maintenace)
      
      await this.$testApi
        .post("/application", payload)
        .then(async (response) => {
          const res = response.data;

          if (!res.status) {
            this.$refs.toastRef.open(
              {
                message: res.message,
              },
              { bgClass: "bg-danger" }
            );
            return;
          }

          await this.$refs.toastRef
            .open(
              {
                message: res.message,
              },
              { bgClass: "bg-success" }
            )
            .then(() => {
              this.agree();
            });

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async onUpdate() {
      const payload = { ...this.form };
      payload.id = this.selectedRecord.id;
      await this.$testApi
        .put("/application", payload)
        .then(async (response) => {
          const res = response.data;

          if (!res.status) {
            this.$refs.toastRef.open(
              {
                message: res.message,
              },
              { bgClass: "bg-danger" }
            );
            return;
          }

          await this.$refs.toastRef
            .open(
              {
                message: res.message,
              },
              { bgClass: "bg-success" }
            )
            .then(() => {
              this.agree();
            });

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
    });
  },
};
</script>

<template>
  <div
    class="modal fade"
    ref="modal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="addRecordLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="action == 'ADD'">Adding Record</h5>
          <h5 v-else>Editing Record</h5>
        </div>
        <form
          class=""
          role="form"
          @submit.prevent="action == 'ADD' ? onSubmit() : onUpdate()"
        >
          <div class="modal-body py-5">
            <BRow>
              <BCol cols="12">
                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Name"
                >
                  <BFormInput required v-model="form.name"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Prod Version"
                >
                  <BFormInput required v-model="form.prod_version"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Prod URL"
                >
                  <BFormInput required v-model="form.prod_url"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Staging Version"
                >
                  <BFormInput
                    required
                    v-model="form.staging_version"
                  ></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Staging URL"
                >
                  <BFormInput required v-model="form.staging_url"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Dev Version"
                >
                  <BFormInput
                    required
                    v-model="form.development_version"
                  ></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Dev URL"
                >
                  <BFormInput
                    required
                    v-model="form.development_url"
                  ></BFormInput>
                </BFormGroup>

                  <BFormGroup
                    v-if="action == 'EDIT'"
                    class="mb-3"
                    label-cols-sm="2"
                    label-cols-lg="2"
                    label="Maintenace"
                  >
                      <b-form-select required v-model="form.maintenace">
                        <option :value=true>True</option>
                        <option :value=false selected>False</option>
                      </b-form-select>
                  </BFormGroup>


              </BCol>
            </BRow>
          </div>
          <div class="modal-footer">
            <b-button v-if="action == 'ADD'" variant="primary" type="submit">
              Save
            </b-button>
            <b-button v-else variant="primary" type="submit"> Update </b-button>
            <a href="#" class="btn" @click.prevent="cancel">Cancel</a>
          </div>
        </form>
      </div>
    </div>
    <toast-component ref="toastRef"></toast-component>
  </div>
</template>

<style scoped>
/* .modal-footer {
    display: inline-grid;
    justify-content: center;
    text-align: center;
  } */
</style>
