<script setup lang="ts">
import { useRouter } from 'vue-router';
import { openModal as openModalHelper } from '@/utils/modalHelper';

const router = useRouter();

function openModal(modalType, id = null) {
    // Ortak yardımcı fonksiyonu kullanarak modalı aç
    openModalHelper(router, 'about', modalType, id);
}
</script>

<template>
    <div class="about-container">
        <ul class="nav-links">
            <li>
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link to="/about" class="nav-link">About</router-link>
            </li>
        </ul>

        <h1>About Page</h1>
        <p>This is the about page.</p>

        <div class="modal-test-buttons">
            <button class="modal-button info" @click="openModal('info')">Bilgi Modalı</button>
            <button class="modal-button warning" @click="openModal('warning')">Uyarı Modalı</button>
            <button class="modal-button confirm" @click="openModal('confirm', 1)">Onay Modalı</button>
        </div>

        <router-link to="/about/drawer/info/123" class="drawer-link">Open Info Drawer</router-link>
        <br>
        <br>
        <router-link to="/">Go To Home </router-link>
    </div>
</template>

<style scoped>
.about-container {
    width: 100%;
    padding: 20px;
    animation: fade-in 0.5s ease-out;
}

.nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 10px;
}

.nav-link {
    display: inline-block;
    margin: 5px 0;
    padding: 5px 0;
    transition: color 0.3s;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #535bf2;
    transition: width 0.3s;
}

.nav-link:hover::after {
    width: 100%;
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

.modal-test-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;
}

.modal-button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.modal-button.info {
    background-color: #0074e4;
}

.modal-button.info:hover {
    background-color: #0064c8;
}

.modal-button.warning {
    background-color: #e67e22;
}

.modal-button.warning:hover {
    background-color: #d35400;
}

.modal-button.confirm {
    background-color: #e74c3c;
}

.modal-button.confirm:hover {
    background-color: #c0392b;
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