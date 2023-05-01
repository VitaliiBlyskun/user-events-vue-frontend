<!-- <template>
    <div v-if="events.length > 0">
        <transition-group name="event-list">
            <div class="container">
                <event-item v-for="event in events" :event="event" :key="event.id" @remove="$emit('remove', event)" />
            </div>
        </transition-group>
    </div>
    <h2 v-else style="color: red">Event list is empty</h2>
</template>

<script>
import EventItem from "@/components/EventItem.vue";

export default {
    components: {
        EventItem,
    },
    props: {
        events: {
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

.event-list-item {
    display: inline-block;
    margin-right: 10px;
}

.event-list-enter-active,
.event-list-leave-active {
    transition: all 1s ease;
}

.event-list-enter-from,
.event-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style> -->

<template>
    <div v-if="events.length > 0">
        <h3>Events list</h3>
        <div class="container">
        <transition-group name="event-list">
        <event-item 
        v-for="event in events"
        :event="event"
        @remove='$emit("remove", event)'

        :key="event.id"

        />
        </transition-group>
        </div>

    </div>
<h2 v-else style="color: red">Event list is empty</h2>
</template>

<script>
import EventItem from "@/components/EventItem.vue";
export default {
      components: {
        EventItem,
    },
    props: {
        events: {
            type: Array,
            required: true,
        }
    }
};
</script>

<style scoped>
/* .event {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
} */

.container {
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
.event-list-item {
  display: inline-block;
  margin-right: 10px;
}

.event-list-enter-active,
.event-list-leave-active {
  transition: all 1s ease;
}

.event-list-enter-from,
.event-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.event-list-move {
    transition: transform 0.8s ease;
}

</style>
