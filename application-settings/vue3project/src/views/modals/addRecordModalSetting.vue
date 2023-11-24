<script>
import { Modal } from "bootstrap";
import ToastComponent from "@/components/ToastComponent";
import { reactive } from "vue";

export default {
  components: { ToastComponent },
  data() {
    return {
      tableData: reactive([]),
      selectedItem: null,
      dialog: false,
      resolve: null,
      reject: null,
      modal: null,
      form: {
        application_id: null,
        property_name: "",
        property_value: "",
        type: "",
        description: "",
      },
     
      action: "ADD",

      selectedRecord: {},
      appname: ""
    };
  },
  
  
  methods: {
      async getListApp() {
      await this.$testApi
        .get("/application")
        .then((response) => {
          const res = response.data;
          // this.tableData = []
          const arrayData = res.data.list;
          
          console.log('app', arrayData);

          console.log('id', arrayData.map(item => item.id));

          console.log('id', arrayData.map(item => item.name));

          // this.options.push(...arrayData.id, ...arrayData.name);
          
          // this.options.push(...arrayData);

          this.tableData.splice(0, this.tableData.length, ...arrayData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    open(data = {}, action = "ADD", appid, appname,) {
      // this.dialog = true

      console.log('action', action)
      console.log('appid',appid)
      console.log('appname', appname)

      if (action == "ADD") {
        this.form.application_id = appid;
        this.appname = appname;
      }

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
      payload.application_id = parseInt(payload.application_id)

      console.log('testingpayload', payload)
      
      await this.$testApi
        .post('/setting', payload)
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
        .put('/setting', payload)
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

  async created() {
    await this.getListApp();
    // this.tableData.push({
    //   name: "adad"
    // })

    // this.tableData = [{ name: "sdasdasda" }];
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

                  >
                  <div v-if="action == 'ADD'" class="alert alert-dark" role="alert">
                    Selected application: 
                  {{ appname }}
                   </div>
                    
                    <b-form-select v-if="action == 'EDIT'" required v-model="form.application_id">
                      <option :value="null" disabled>-- Please select an application --</option>
                      <option v-for="(option, tableData) in tableData" :key="tableData" :value="option.id">
                        
                        {{ option.name }}
                        
                      </option>
                    </b-form-select>
                   
                </BFormGroup>

                 <!-- <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Application Id"
                >
                  <BFormInput required v-model="form.application_id"></BFormInput>
                </BFormGroup> -->

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Property Name"
                >
                  <BFormInput required v-model="form.property_name"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Property Value"
                >
                  <BFormInput required v-model="form.property_value"></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Type"
                >
                  <BFormInput
                    required
                    v-model="form.type"
                  ></BFormInput>
                </BFormGroup>

                <BFormGroup
                  class="mb-3"
                  label-cols-sm="2"
                  label-cols-lg="2"
                  label="Description"
                >
                  <BFormInput required v-model="form.description"></BFormInput>
                  
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
