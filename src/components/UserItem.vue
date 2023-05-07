<template>
  <div class="user">
    <ul class="title-container" @click='$router.push(`/${user._id}`)'>
      <li><strong>user name: </strong>{{ user.userName }}</li>
      <li><strong>first name: </strong>{{ user.firstName }}</li>
      <li><strong>surname: </strong>{{ user.lastName }}</li>
      <li><strong>email: </strong>{{ user.email }}</li>
      <li><strong>phone: </strong>{{ user.phone }}</li>
      <li><strong>eventsCount: </strong>{{ user.eventsCount }}</li>
      <li><strong>nextDate: </strong>{{ user.startDate || 'No events' }}</li>
    </ul>
    <div>
      <my-button @click='$emit("remove", user)'>
        delete</my-button>
    </div>
  </div>
</template>

<script>

import { showUserEventNextDate } from "@/api";

export default {
  props: {
    user: Object,
    required: true,
  },
  mounted() {
    this.getUserInfo(this.user._id)
  },
  methods: {
    async getUserInfo(id) {
      const startDate = await showUserEventNextDate(id);
      console.log(startDate);
      this.user.startDate = startDate;
    },
  }
}
</script>

<style scoped>
.user {
  padding: 20px;
  border: 3px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
}

.title-container {
  cursor: pointer;
}
</style>