<template>
  <div>
    <h1>User with id = {{ $route.params.id }}</h1>
    <my-button @click="this.$router.push({ path: '/' })">
      Return to user list
    </my-button>
    <div class="app-btns">
      <my-button @click="showModal"> Create event </my-button>
      <my-input v-model="searchQuery" placeholder="Search ..." />
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible">
      <event-form @create="createEvent" />
    </my-modal>

    <event-list
      :events="sortedAndSearchedEvents"
      @remove="removeEvent"
      v-if="!isEventsLoading"
    />
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import MyModal from "@/components/UI/MyModal.vue";
import EventForm from "@/components/EventForm.vue";
import EventList from "@/components/EventList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import { getUserById, addUserEvent, deleteUserEvent } from "@/api";

export default {
  components: {
    MyModal,
    EventForm,
    EventList,
    MySelect,
  },

  data() {
    return {
      events: [],
      modalVisible: false,
      isEventsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "by title" },
        { value: "description", name: "by description" },
      ],
    };
  },
  methods: {
    async createEvent(user) {
      if (
        !user.title ||
        !user.description ||
        !user.startDate ||
        !user.endDate
      ) {
        alert("Fill in all fields");
        return;
      }

      const startDate = new Date(user.startDate);
      const endDate = new Date(user.endDate);

      if (
        isNaN(startDate.getTime()) ||
        isNaN(endDate.getTime()) ||
        startDate.getTime() >= endDate.getTime()
      ) {
        alert("Dates in not valid");
        return;
      }

      const UniqueEvent = this.events.findIndex((event) => {
        return (
          event.title === user.title &&
          event.startDate === user.startDate &&
          event.endDate === user.endDate &&
          event.description === user.description
        );
      });

      if (UniqueEvent !== -1) {
        // якщо івент з такими ж полями уже є в списку
        alert("You can’t create event for this time");
      } else {
        const newEvent = await addUserEvent(this.$route.params.id, {
          title: user.title,
          description: user.description,
          startDate: user.startDate,
          endDate: user.endDate,
        });
        this.events.push(newEvent);
        this.modalVisible = false;
      }
    },

    async removeEvent(event) {
      // const deletedEvents = await deleteUserEvent(this.$route.params.id, event._id)
      // this.events = this.events.filter((item) => item._id !== deletedEvents._id);
      const index = this.events.findIndex((item) => item._id === event._id);
      this.events.splice(index, 1);
    },

    showModal() {
      this.modalVisible = true;
    },

    async fetchEvents() {
      this.isEventsLoading = true;
      const events = await getUserById(this.$route.params.id);
      this.events = events;
      this.isEventsLoading = false;
    },
  },

  mounted() {
    this.fetchEvents();
  },
  computed: {
    sortedEvents() {
      return [...this.events].sort((preview, next) => {
        return preview[this.selectedSort]?.localeCompare(
          next[this.selectedSort]
        );
      });
    },
    sortedAndSearchedEvents() {
      return this.sortedEvents.filter((event) =>
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.app-btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
