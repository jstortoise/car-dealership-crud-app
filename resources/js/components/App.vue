<template>
    <div class="p-10">
        <header>
            <ul class="flex gap-5 font-semibold">
                <li class="pointer hover:underline">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="pointer hover:underline">
                    <router-link to="/cars">Cars</router-link>
                </li>
                <li class="pointer hover:underline">
                    <router-link to="/manufacturers">Manufacturers</router-link>
                </li>
            </ul>
        </header>
        <div class="mt-10">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>