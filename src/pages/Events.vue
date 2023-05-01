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

    <event-list :events="sortedAndSearchedEvents" @remove="removeEvent" v-if="!isEventsLoading"/>
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
import MyModal from "@/components/UI/MyModal.vue";
import EventForm from "@/components/EventForm.vue";
import EventList from "@/components/EventList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import { getUserById, deleteUserEvent, addUserEvent } from "@/api";

export default {
    components: {
        MyModal,
        EventForm,
        EventList,
        MySelect,
    },

    data() {
        return {
            events: [
                // {
                //     id: 1,
                //     title: "event1",
                //     description: "event2",
                //     startDate: "27-04-2023",
                //     endDate: "28-04-2023",
                // },
                // {
                //     id: 2,
                //     title: "event2",
                //     description: "event2",
                //     startDate: "30-04-2023",
                //     endDate: "31-04-2023",
                // },
                // {
                //     id: 3,
                //     title: "event3",
                //     description: "event2",
                //     startDate: "27-04-2023",
                //     endDate: "28-04-2023",
                // },
                // {
                //     id: 4,
                //     title: "event4",
                //     description: "event2",
                //     startDate: "30-04-2023",
                //     endDate: "31-04-2023",
                // },
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
            console.log(event);
            this.events.push(event);
            this.modalVisible = false;
        },
        removeEvent(event) {
            console.log(event);
            this.events = this.events.filter((item) => item.id !== event.id);
        },
        showModal() {
            this.modalVisible = true;
        },
    //     async fetchEvents() {
    //         try {
    //             this.isEventsLoading = true;
    //             const response = await axios.get(
    //                 "https://jsonplaceholder.typicode.com/posts?_limit=10"
    //             );
    //             this.events = response.data;
    //             console.log(response);
    //         } catch (error) {
    //             alert("Error fetch");
    //         } finally {
    //             this.isEventsLoading = false;
    //         }
    //     },
    // },

        async fetchEvents() {
            this.isEventsLoading = true;
            // this.users = await getUserById();
            console.log("sho to", this.$route.params.id)
          const events = await getUserById(this.$route.params.id)
          console.log(events)
            this.events = events
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
    }
    };
</script>

<style scoped>
.app-btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
