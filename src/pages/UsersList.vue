<template>
  <div>
    <h1 style="text-align: center">User list</h1>
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
import { getUserList, addUser, deleteUser, getUserById } from "@/api";

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

      const IsValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!IsValidEmail.test(user.email)) {
        alert("Your email address is not valid");
        return;
      }
      const IsValidPhone = /^\d{10}$/;
      if (!IsValidPhone.test(user.phone)) {
        alert("Your phone number must have 10 symbols)");
        return;
      }

    const newUser = await addUser(user, this.users);
      if (!newUser) {
        alert('User with that name already exists');
        return;
      }

      const userEvents = await getUserById(newUser._id);
      const eventsCount = userEvents.length;

      const updatedUser = {
        ...newUser,
        eventsCount
      };
      this.users.push(updatedUser);
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
