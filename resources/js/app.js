/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './components/App.vue';
import ManufacturerList from './components/Manufacturer/List.vue';
import Manufacturer from './components/Manufacturer/View.vue';
import ManufacturerForm from './components/Manufacturer/Form.vue';
import CarList from './components/Car/List.vue';
import Car from './components/Car/View.vue';
import CarForm from './components/Car/Form.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/manufacturers', component: ManufacturerList},
        {path: '/manufacturers/:id', component: Manufacturer},
        {path: '/manufacturers/:id/edit', component: ManufacturerForm},
        {path: '/manufacturers/create', component: ManufacturerForm},
        {path: '/cars', component: CarList},
        {path: '/cars/:id', component: Car},
        {path: '/cars/:id/edit', component: CarForm},
        {path: '/cars/create', component: CarForm},
    ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
