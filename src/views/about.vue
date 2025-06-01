<script setup lang="ts">
</script>

<template>
    <div class="about-container">

        <h1>About Page</h1>
        <p>This is the about page.</p>
        <router-link to="/about/drawer/info/123" class="drawer-link">Open Info Drawer</router-link>
        <br>
        <br>
        <router-link to="/">Go To Home </router-link>
    </div>
</template>

<style scoped>
.about-container {
    width: 100%;
    animation: fade-in 0.5s ease-out;
}

.drawer-link {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #646cff;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.drawer-link:hover {
    background-color: #535bf2;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>