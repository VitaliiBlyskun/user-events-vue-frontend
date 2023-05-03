<template>
  <div v-if="users.length > 0">
    <div class="container">
      <transition-group name="user-list">
        <user-item
          v-for="user in users"
          :user="user"
          :events="user.events"
          @remove="$emit('remove', user)"
        />
      </transition-group>
    </div>
  </div>
  <h2 v-else style="color: red">User list is empty</h2>
</template>

<script>
import UserItem from "@/components/UserItem.vue";

export default {
  components: {
    UserItem,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}

.user-list-enter-active,
.user-list-leave-active {
  transition: all 1s ease;
}

.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.user-list-move {
  transition: transform 0.8s ease;
}
</style>
