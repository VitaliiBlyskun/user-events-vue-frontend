<!-- <template>
    <div >
        <h1>User list</h1>
        <div class="app-btns">
            <my-button @click="showModal">
                Create user
            </my-button>
            <my-input v-model="searchQuery" placeholder="Search ..." />
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-modal v-model:show="modalVisible">
            <user-form @create="createUser" />
        </my-modal>
        <user-list :users="sortedAndSearchedUsers" @remove="removeUser" v-if="!isUsersLoading" />
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
                { value: "userName", name: "by username" },
                { value: "email", name: "by email" },
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
};
</script>

<style>


.app-btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
</style> -->

<template>
  <div>
    <h1>User list</h1>
    <div class="app-btns">
      <my-button @click="showModal"> Create user </my-button>
      <my-input v-model="searchQuery" placeholder="Search ..." />
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible">
      <user-form @create="createUser" />
    </my-modal>
    <user-list
      :users="sortedAndSearchedUsers"
      @remove="removeUser"
      v-if="!isUsersLoading"
    />
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import MyModal from "@/components/UI/MyModal.vue";
import UserForm from "@/components/UserForm.vue";
import UserList from "@/components/UserList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import { getUserList, addUser, deleteUser } from "@/api";

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
      sortOptions: [
        { value: "userName", name: "by username" },
        { value: "email", name: "by email" },
      ],
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    async createUser(user) {
      if (
        !user.userName ||
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.phone
      ) {
        alert("Fill in all fields");
        return;
      }

      const newUser = await addUser(user);
      this.users.push(newUser);
      this.modalVisible = false;
    },

    async removeUser(user) {
      const deletedUser = await deleteUser(user._id);
      this.users = this.users.filter((user) => user._id !== deletedUser._id);
    },

    showModal() {
      this.modalVisible = true;
    },
    async fetchUsers() {
      this.isUsersLoading = true;
      this.users = await getUserList();
      this.isUsersLoading = false;
    },
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    sortedUsers() {
      if (!Array.isArray(this.users)) {
        console.error("this.users is not an array!");
        return [];
      }
      return [...this.users].sort((preview, next) => {
        return preview[this.selectedSort]?.localeCompare(
          next[this.selectedSort]
        );
      });
    },
    sortedAndSearchedUsers() {
      return this.sortedUsers.filter((user) =>
        user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style>
.app-btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
