<!-- <template>
  <div class="app">
    <h1>User list</h1>
    <my-input
    v-model="searchQuery"
    placeholder="Search ..."
    />
    <div class = "app-btns">
         <my-button @click="showModal">
          Create user
        </my-button>
        <my-select
        v-model="selectedSort"
        :options="sortOptions"
        />
    </div>
    <my-modal v-model:show="modalVisible">
      <user-form @create="createUser" />
    </my-modal>
    <user-list :users="sortedAndSearchedUsers" @remove="removeUser" v-if="!isUsersLoading"/>
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import axios from "axios"
import MyModal from "@/components/UI/MyModal.vue";
import UserForm from "@/components/UserForm.vue";
import UserList from "@/components/UserList.vue";
import MySelect from "@/components/UI/MySelect.vue"

export default {
  components: {
    MyModal,
    UserForm,
    UserList,
    MySelect,
  },

  data() {
    return {
      users: [],
      modalVisible: false,
      isUsersLoading: false,
      selectedSort: "",
      searchQuery: "",
    //   page: 1,
    //   limit: 10,
      sortOptions: [
        {value: "userName", name: "by username"},
        {value: "email", name: "by email" },
      ]
    };
  },
  methods: {
    createUser(user) {
      this.users.push(user);
      this.modalVisible = false;
    },
    removeUser(user) {
      this.users = this.users.filter((item) => item.id !== user.id);
    },
    showModal() {
      this.modalVisible = true;
    },
      async fetchUsers() { 
          try {
            this.isUsersLoading = true
              const response = await axios.get("https://user-events-vue-backend.onrender.com/api/users")
            //   const response = await axios.get("https://user-events-vue-backend.onrender.com/api/users", {
            //       params: {
            //         _page: this.page,
            //         _limit: this.limit,
            //     }
            // })
              this.users = response.data.data.result
              console.log(this.users)
        } catch (error) {
            alert(error.message);
          } finally {
              this.isUsersLoading = false;
        }
      }
    },
    mounted() {
        this.fetchUsers();
    },
    computed: {
        sortedUsers() {
            return [...this.users].sort((preview, next) => {
                return preview[this.selectedSort]?.localeCompare(next[this.selectedSort])
            })
        },
        sortedAndSearchedUsers() {
            return this.sortedUsers.filter(user => user.userName.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {

    }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  /* background: rgb(239, 222, 229);
  background: radial-gradient(
    circle,
    rgba(239, 222, 229, 1) 57%,
    rgba(252, 252, 252, 1) 100%
  ); */
  background: linear-gradient(45deg, #eecfba, #c5dde8);
}

.app {
  padding: 20px;
}

.app-btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

</style> -->


<template>
  <div class="app">
    <router-view></router-view>
  </div>

</template>

<script>

</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: linear-gradient(45deg, #eecfba, #c5dde8);
}

.app {
    padding: 20px;
}

</style>