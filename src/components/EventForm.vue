<template>
    <h2 class="event-title">Create event</h2>
    <form @submit.prevent>
        <my-input v-model.trim()="event.title" type="text" placeholder="title" />
        <my-input v-model.trim()="event.description" type="text" placeholder="description" />
        <my-input v-model.trim()="event.startDate" type="text" placeholder="startDate - 'DD-MM-YYYY'" />
        <my-input v-model.trim()="event.endDate" type="text" placeholder="endDate - 'DD-MM-YYYY'" />
        <my-button @click="createEvent" style="align-self: flex-end">save</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            event: {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
            },
        };
    },
    methods: {
        createEvent() {
            this.event.id = Date.now();
            this.$emit("create", this.event);
            this.event = {
                title: "",
                description: "",
                startDate: "",
                endDate: "",
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

.event-title {
    text-align: center;
}
</style>
