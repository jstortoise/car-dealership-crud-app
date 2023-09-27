<template>
    <div class="w-full">
        <button-link
            link="/manufacturers/create"
            title="Add Manufacturer"
        />
        <table class="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="px-6 py-3">#</th>
                    <th class="px-6 py-3">Name</th>
                    <th class="px-6 py-3">Description</th>
                    <th class="px-6 py-3">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="manufacturer in manufacturers" :key="`manufacturer-${manufacturer.id}`">
                    <td class="px-6 py-3">{{ manufacturer.id }}</td>
                    <td class="px-6 py-3">{{ manufacturer.name }}</td>
                    <td class="px-6 py-3">{{ manufacturer.description }}</td>
                    <td class="px-6 py-3 flex gap-2">
                        <router-link :to="`/manufacturers/${manufacturer.id}`">View</router-link>
                        <router-link :to="`/manufacturers/${manufacturer.id}/edit`">Edit</router-link>
                        <button @click="deleteManufacturer(manufacturer.id)">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import ButtonLink from '../atoms/ButtonLink.vue';
export default {
    components: {ButtonLink},

    data() {
        return {
            manufacturers: [],
        };
    },

    computed: {

    },

    created() {
        this.load();
    },

    methods: {
        load() {
            axios.get('/api/manufacturers').then(res => {
                this.manufacturers = res.data;
            })
        },

        deleteManufacturer(id) {
            if (confirm('Are you sure to remove this manufacturer?')) {
                axios.delete(`/api/manufacturers/${id}`).then(() => {
                    this.manufacturers = this.manufacturers.filter(t => t.id !== id);
                });
            }
        },
    },
};
</script>