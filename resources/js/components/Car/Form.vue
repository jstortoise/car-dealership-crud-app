<template>
    <div>
        <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900" v-if="isNew">Add Car</h2>
        <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900" v-else>Edit Car</h2>

        <form @submit.prevent="submitForm">
            <div class="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" name="name" id="name" v-model="car.name" required/>
                </div>
                <div>
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="description" id="description" v-model="car.description" ></textarea>
                </div>
                <div class="form-control">
                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Manufacturer</label>
                    <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="manufacturer_id" id="manufacturer_id" v-model="car.manufacturer_id">
                        <option value=""></option>
                        <option v-for="manufacturer in manufacturers" :value="manufacturer.id" :key="`manufacturer-${manufacturer.id}`">{{ manufacturer.name }}</option>
                    </select>
                </div>
            </div>

            <div class="flex gap-4 mt-4">
                <button type="submit" class="
                text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{{ isNew ? 'Save' : 'Update' }}</button>
                <button-link
                    link="/cars"
                    title="Cancel"
                />
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import ButtonLink from '../atoms/ButtonLink.vue';
export default {
    components: {ButtonLink},
    data() {
        return {
            car: {
                name: '',
                description: '',
                manufacturer_id: null,
            },

            manufacturers: [],
        };
    },

    computed: {
        isNew() {
            return !this.$route.params.id;
        },
    },

    created() {
        if (!this.isNew) {
            this.loadCar();
        }
        this.loadManufacturers();
    },

    methods: {
        loadCar() {
            axios.get(`/api/cars/${this.$route.params.id}`).then(res => {
                this.car = res.data;
            });
        },

        loadManufacturers() {
            axios.get(`/api/manufacturers`).then(res => {
                this.manufacturers = res.data;
            });
        },

        submitForm() {
            if (this.isNew) {
                axios.post(`/api/cars`, this.car).then(() => {
                    this.goToList();
                });
            } else {
                axios.put(`/api/cars/${this.$route.params.id}`, this.car).then(() => {
                    this.goToList();
                });
            }
        },

        goToList() {
            this.$router.push('/cars');
        }
    },
};
</script>