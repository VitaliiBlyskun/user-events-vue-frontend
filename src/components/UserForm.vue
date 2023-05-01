<!-- <template>
  <h2 class="user-title">Create user</h2>
  <form @submit.prevent>
    <my-input v-model.trim()="user.userName" type="text" placeholder="name" />
    <my-input
      v-model.trim()="user.firstName"
      type="text"
      placeholder="firstName"
    />
    <my-input
      v-model.trim()="user.lastName"
      type="text"
      placeholder="lastName"
    />
    <my-input v-model.trim()="user.email" type="email" placeholder="email" />
    <my-input v-model.trim()="user.phone" type="tel" placeholder="phone" />
    <my-button @click="createUser" style="align-self: flex-end">save</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
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
    createUser() {
      this.user.id = Date.now();
      console.log("Creating user:", this.user);
      this.$emit("create", this.user);
      this.user = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.user-title {
  text-align: center;
}
</style> -->


<template>
  <h2 class="user-title">Create user</h2>
  <form @submit.prevent>
    <my-input v-model.trim()="user.userName" type="text" placeholder="name" />
    <my-input v-model.trim()="user.firstName" type="text" placeholder="firstName" />
    <my-input v-model.trim()="user.lastName" type="text" placeholder="lastName" />
    <my-input v-model.trim()="user.email" type="email" placeholder="email" />
    <my-input v-model.trim()="user.phone" type="tel" placeholder="phone" />
    <my-button @click="createUser" style="align-self: flex-end">save</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
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
    createUser() {
      // console.log("Creating user:", this.user);
      this.$emit("create", this.user);
      this.user = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.user-title {
  text-align: center;
}
</style>