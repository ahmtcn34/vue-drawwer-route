<template>
    <div class="home-container">
        <ul class="nav-links">
            <li>
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link to="/about" class="nav-link">About</router-link>
            </li>
        </ul>
        <h1>Members</h1>
        <div class="members-table-container">
            <table class="members-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TransitionGroup name="list" tag="tbody">
                    <tr v-for="(member, index) in members" :key="member.id"
                        :style="{ animationDelay: `${index * 100}ms` }" class="table-row-animated">
                        <td>{{ member.id }}</td>
                        <td>{{ member.firstName }}</td>
                        <td>{{ member.lastName }}</td>
                        <td>{{ member.phone }}</td>
                        <td>{{ member.email }}</td>
                        <td>
                            <button class="edit-button" @click="router.push(`/users/${member.id}/edit`)">Edit</button>
                        </td>
                    </tr>
                </TransitionGroup>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '../router';

const members = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '+90 555 123 4567', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '+90 555 765 4321', email: 'jane.smith@example.com' },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', phone: '+90 555 987 6543', email: 'michael.johnson@example.com' },
    { id: 4, firstName: 'Emily', lastName: 'Brown', phone: '+90 555 456 7890', email: 'emily.brown@example.com' },
    { id: 5, firstName: 'David', lastName: 'Wilson', phone: '+90 555 321 6547', email: 'david.wilson@example.com' },
    { id: 6, firstName: 'Sarah', lastName: 'Miller', phone: '+90 555 876 5432', email: 'sarah.miller@example.com' },
    { id: 7, firstName: 'James', lastName: 'Davis', phone: '+90 555 234 5678', email: 'james.davis@example.com' },
    { id: 8, firstName: 'Olivia', lastName: 'Garcia', phone: '+90 555 654 3210', email: 'olivia.garcia@example.com' },
    { id: 9, firstName: 'William', lastName: 'Martinez', phone: '+90 555 123 4567', email: 'william.martinez@example.com' },
    { id: 10, firstName: 'Sophia', lastName: 'Hernandez', phone: '+90 555 765 4321', email: 'sophia.hernandez@example.com' }
];


</script>

<style scoped>
.home-container {
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

.members-table-container {
    margin-top: 20px;
}

.members-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #2c2c2c;
    color: #e0e0e0;
}

.members-table th {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #444;
    background-color: #1a1a1a;
}

.members-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #444;
}

.table-row-animated {
    animation: slide-up 0.5s ease-out both;
}

.table-body-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #2c2c2c;
    color: #e0e0e0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.table-row {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #444;
}

.table-cell {
    padding: 12px 15px;
    text-align: left;
    flex: 1;
}

.table-cell:nth-child(1) {
    flex: 0.5;
}

.table-cell:nth-child(6) {
    flex: 0.8;
}

.list-enter-active {
    transition: all 0.5s ease;
}

.list-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.list-move {
    transition: transform 0.5s;
}

.edit-button {
    padding: 6px 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-button:hover {
    background-color: #45a049;
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

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>