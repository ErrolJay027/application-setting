<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import ToastComponent from "@/components/ToastComponent";
import addRecordModal from "../../modals/addRecordModal.vue";
import { reactive } from "vue";
import moment from 'moment';

/**
 * Advanced-table component
 */
export default {
  setup() {
    // const state = reactive({
    //   items: [],
    // });
    // return {
    //   state,
    // };
  },
  components: { Layout, PageHeader, ToastComponent, addRecordModal },

  data() {
    return {
      tableData: reactive([]),
      title: "Application",
      items: [
        {
          text: "Tables",
        },
        {
          text: "Application",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "createdAt",
      sortDesc: false,
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          key: "api_key",
          sortable: true,
        },
        {
          key: "prod_version",
          sortable: true,
        },
        {
          key: "prod_url",
          sortable: true,
        },
        {
          key: "staging_url",
          sortable: true,
        },
        {
          key: "development_version",
          sortable: true,
        },
        {
          key: "development_url",
          sortable: false,
        },
        {
          key: "maintenace",
          sortable: true,
          sortByFormatted: true,
          fillterByFormatted: true
        },
        {
          key: "createdAt",
          sortable: false,
        },
        {
          key: "actions",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    findIndexById(id) {
      return this.tableData.findIndex((item) => item.id === id);
    },

    async getList() {
      await this.$testApi
        .get("/application")
        .then((response) => {
          const res = response.data;
          // const array = []

            res.data.list.forEach((element) => {
            element.maintenace = !!+element.maintenace;
            element.createdAt = moment(String(element.createdAt)).format('MM/DD/YYYY hh:mm');
              this.tableData.push(element);
             
            });

         
          // this.tableData = []

          const arrayData = res.data.list;
          console.log("response", arrayData);


           this.tableData.splice(0, this.tableData.length, ...arrayData);
          
          // console.log(arrayData);

          // const index = this.findIndexById(arrayData.id);

          // if (index !== -1) {
          //   // Update the item in the array
          //   this.tableData[index] = arrayData;
          // } else {
          //   // If the item is not found, push it to the array
          //   this.tableData.push(arrayData);
          // }
          // this.tableData = arrayData;
          // console.log(res.results);
          // console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async deleteItem(item) {
      await this.$testApi
        .delete("/application", {
          data: {
            id: item.id,
          },
        })
        .then((response) => {
          const res = response.data;

          if (res.status) {
            // alert(res.message);
            this.$refs.toastRef.open({ message: res.message });
            this.getList();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async addRecord() {
      await this.$refs.addRecordRef.open().then((result) => {
        if (result) {
          this.getList();
        }
      });
    },

    async editRecord(item) {
      await this.$refs.addRecordRef.open(item, "EDIT").then((result) => {
        if (result) {
          this.getList();
        }
      });
    },
  },

  async created() {
    await this.getList();
    // this.tableData.push({
    //   name: "adad"
    // })

    // this.tableData = [{ name: "sdasdasda" }];
  },

  // middleware: "authentication"
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <BRow>
      <BCol cols="12">
        <BCard no-body>
          <BCardBody>
            <BCardTitle class="d-flex align-items-center">
              <span>Data Table</span>
              <div class="ms-auto">
                <b-button size="sm" variant="primary" @click="addRecord()">
                  <i class="uil-plus"></i>
                  Add Record</b-button
                >
              </div>
            </BCardTitle>
            <BRow class="mt-4">
              <BCol sm="12" md="6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <BFormSelect
                      v-model="perPage"
                      name size="sm"
                      :options="pageOptions"
                    ></BFormSelect
                    >&nbsp;entries
                  </label>
                </div>
              </BCol>

              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <BFormInput
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ms-2"
                    ></BFormInput>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </BRow>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <BTable
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
                striped
                hover
                small
              >
                <template v-slot:cell(actions)="{ item }">
                  <b-button size="sm" class="px-3 me-2" @click="editRecord(item)">
                    Edit
                  </b-button>
                  <b-button
                    size="sm"
                    variant="danger"
                    class="px-3"
                    @click="deleteItem(item)"
                  >
                    Delete
                  </b-button>
                </template>
              </BTable>
            </div>
            <BRow>
              <BCol>
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <BPagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></BPagination>
                  </ul>
                </div>
              </BCol>
            </BRow>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <toast-component ref="toastRef"></toast-component>
    <add-record-modal ref="addRecordRef"></add-record-modal>
  </Layout>
</template>
