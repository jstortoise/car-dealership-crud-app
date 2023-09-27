<template>
    <div>
        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mb-10">
            <li>
                Name: {{ car.name }}
            </li>
            <li>
                Description: {{ car.description }}
            </li>
            <li>
                Manufacturer: {{ car.manufacturer.name }}
            </li>
        </ul>

        <button-link 
            link="/cars"
            title="To List"
        />
    </div>
</template>

<script>
import axios from 'axios';
import ButtonLink from '../atoms/ButtonLink.vue';
export default {
    components: {ButtonLink},
    data() {
        return {
            car: {},
        };
    },

    computed: {

    },

    created() {
        this.loadManufacture();
    },

    methods: {
        loadManufacture() {
            axios.get(`/api/cars/${this.$route.params.id}`).then(res => {
                this.car = res.data;
            });
        },
    },
};
</script>