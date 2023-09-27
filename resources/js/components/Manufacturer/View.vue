<template>
    <div>
        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 mb-10">
            <li>
                Name: {{ manufacture.name }}
            </li>
            <li>
                Description: {{ manufacture.description }}
            </li>
        </ul>

        <button-link 
            link="/manufacturers"
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
            manufacture: {},
        };
    },

    computed: {

    },

    created() {
        this.loadManufacture();
    },

    methods: {
        loadManufacture() {
            axios.get(`/api/manufacturers/${this.$route.params.id}`).then(res => {
                this.manufacture = res.data;
            });
        },
    },
};
</script>