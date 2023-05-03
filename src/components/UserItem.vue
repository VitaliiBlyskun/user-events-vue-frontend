<template>
  <div class="user">
    <ul class="title-container" @click='$router.push(`/${user._id}`)'>
      <li><strong>user name: </strong>{{ user.userName }}</li>
      <li><strong>first name: </strong>{{ user.firstName }}</li>
      <li><strong>surname: </strong>{{ user.lastName }}</li>
      <li><strong>email: </strong>{{ user.email }}</li>
      <li><strong>phone: </strong>{{ user.phone }}</li>
      <li><strong>eventsCount: </strong>{{ user.eventsCount }}</li>
      <li><strong>nextDate: </strong>{{ getNextEventDate(user.events) }}</li>
    </ul>
    <div>
      <my-button @click='$emit("remove", user)'>
        delete</my-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    user: Object,
    events: Array,
    required: true,
  },
    methods: {
        getNextEventDate(events) {
      if (events && events.length > 0) {
        const sortedEvents = events
          .filter((event) => event.userId === this.user._id)
          .sort((first, second) => new Date(first.startDate) - new Date(second.startDate));
          console.log(sortedEvents)
        return sortedEvents[0].startDate;
      } else {
        return "unknown";
      }
    },
  },
};
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