<template>
    <div class="w-full">
        <div class="flex items-center justify-between">
            <button-link
                link="/cars/create"
                title="Add Car"
            />
            <div class="flex items-center gap-5">
                <label for="manufacturer_id">Manufacturer</label>
                <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="manufacturer_id" id="manufacturer_id" v-on:change="filterCars">
                    <option value=""></option>
                    <option v-for="manufacturer in manufacturers" :value="manufacturer.id" :key="`manufacturer-${manufacturer.id}`">{{ manufacturer.name }}</option>
                </select>
            </div>
        </div>
        <table class="mt-2 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th class="px-6 py-3">#</th>
                    <th class="px-6 py-3">Name</th>
                    <th class="px-6 py-3">Description</th>
                    <th class="px-6 py-3">Manufacturer</th>
                    <th class="px-6 py-3">Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="car in cars" :key="`car-${car.id}`">
                    <td class="px-6 py-3">{{ car.id }}</td>
                    <td class="px-6 py-3">{{ car.name }}</td>
                    <td class="px-6 py-3">{{ car.description }}</td>
                    <td class="px-6 py-3">{{ car.manufacturer.name }}</td>
                    <td class="px-6 py-3 flex gap-2">
                        <router-link :to="`/cars/${car.id}`">View</router-link>
                        <router-link :to="`/cars/${car.id}/edit`">Edit</router-link>
                        <button @click="deleteManufacturer(car.id)">Remove</button>
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
            cars: [],
            manufacturers: [],
            manufacturer_id: null,
        };
    },

    computed: {

    },

    created() {
        this.load();
        this.loadManufacturers();
    },

    methods: {
        load() {
            axios.get('/api/cars').then(res => {
                this.cars = res.data;
            })
        },
        
        loadManufacturers() {
            axios.get('/api/manufacturers').then(res => {
                this.manufacturers = res.data;
            })
        },

        filterCars(e) {
            if (e.target.value) {
                axios.get('/api/cars?manufacturer_id=' + e.target.value).then(res => {
                    this.cars = res.data;
                })
            } else {
                this.load();
            }
        },

        deleteManufacturer(id) {
            if (confirm('Are you sure to remove this car?')) {
                axios.delete(`/api/cars/${id}`).then(() => {
                    this.cars = this.cars.filter(t => t.id !== id);
                });
            }
        },
    },
};
</script>