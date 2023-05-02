<!-- <template>
    <div>
       <h1> User with name "{{ $route.params.id }}"</h1>
    </div>
</template>

<script>
export default {

}

</script>

<style scoped></style> -->

<!-- <template>
  <div>
    <h1>User with name "{{ $route.params.id }}"</h1>
    <div class="app-btns">
      <my-button @click="showModal"> Create event </my-button>
      <my-input v-model="searchQuery" placeholder="Search ..." />
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model:show="modalVisible">
      <event-form @create="createEvent" />
    </my-modal>
  </div>
</template>

<script>
// import axios from "axios";
import MyModal from "@/components/UI/MyModal.vue";
import EventForm from "@/components/EventForm.vue";
import EventList from "@/components/EventList.vue";
import MySelect from "@/components/UI/MySelect.vue";

export default {
  components: {
    MyModal,
    EventForm,
    MySelect,
  },

  data() {
    return {
      events: [
        {
          id: 1,
          title: "event1",
          description: "event2",
          startDate: "27-04-2023",
          endDate: "28-04-2023",
        },
        {
          id: 2,
          title: "event2",
          description: "event2",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
        {
          id: 3,
          title: "event3",
          description: "event2",
          startDate: "27-04-2023",
          endDate: "28-04-2023",
        },
        {
          id: 4,
          title: "event4",
          description: "event2",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
        {
          id: 5,
          title: "event5",
          description: "event5",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
        {
          id: 6,
          title: "event6",
          description: "event6",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
        {
          id: 6,
          title: "aaa",
          description: "event7",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
        {
          id: 6,
          title: "event8",
          description: "aaa",
          startDate: "30-04-2023",
          endDate: "31-04-2023",
        },
      ],
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
      createEvent(event) {
        console.log(event)
    //   this.events.push(event);
    //   this.modalVisible = false;
    },
      removeEvent(event) {
        console.log(event)
    //   this.events = this.events.filter((item) => item.id !== event.id);
    },
    showModal() {
      this.modalVisible = true;
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
</style>  -->

<template>
  <div>
    <h1>User with id = {{ $route.params.id }}</h1>
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
        if (!user.title || !user.description || !user.startDate || !user.endDate) {
        alert("Fill in all fields");
        return;
      }
      const newEvent = await addUserEvent(this.$route.params.id, {
        title: user.title,
        description: user.description,
        startDate: user.startDate,
        endDate: user.endDate,
      });
      this.events.push(newEvent);
      this.modalVisible = false;
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
