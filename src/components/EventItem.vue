<template>
    <div class="event">
        <ul class="title-container">
            <li><strong>title: </strong>{{ event.title }}</li>
            <li><strong>description: </strong>{{ event.description }}</li>
            <li><strong>startDate: </strong>{{ event.startDate }}</li>
            <li><strong>endDate: </strong>{{ event.endDate }}</li>
        </ul>
        <div>
            <my-button @click='$emit("remove", event)'>
                delete</my-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        event: Object,
        required: true,
    },
};
</script>

<style scoped>
.event {
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