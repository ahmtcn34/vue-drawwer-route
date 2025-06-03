<template>
    <div class="drawer-container">
        <transition name="slide-drawer" @after-leave="onAnimationComplete">
            <div v-if="showDrawer" class="drawer dark-theme">
                <div class="drawer-header">
                    <h2>{{ $route.params.drawerType === 'edit' ? 'Üye Düzenle' : 'Üye Detayları' }}</h2>
                    <button @click="closeDrawer" class="close-icon">&times;</button>
                </div>
                <div class="drawer-content">
                    <div v-if="selectedMember" class="member-form">
                        <form @submit.prevent="saveMember">
                            <div class="form-group">
                                <label for="firstName">Ad</label>
                                <input type="text" id="firstName" v-model="editedMember.firstName"
                                    class="form-control dark-input" required autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <label for="lastName">Soyad</label>
                                <input type="text" id="lastName" v-model="editedMember.lastName"
                                    class="form-control dark-input" required autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <label for="phone">Telefon</label>
                                <input type="tel" id="phone" v-model="editedMember.phone"
                                    class="form-control dark-input" required autocomplete="off" />
                            </div>
                            <div class="form-group">
                                <label for="email">E-posta</label>
                                <input type="email" id="email" v-model="editedMember.email"
                                    class="form-control dark-input" required autocomplete="off" />
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-cancel" @click="closeDrawer">İptal</button>
                                <button type="submit" class="btn btn-save">Kaydet</button>
                            </div>
                        </form>
                    </div>
                    <div v-else class="not-found">
                        <p>Üye bulunamadı.</p>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="drawer-backdrop-fade">
            <div v-if="showDrawer" class="drawer-backdrop" @click="closeDrawer"></div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, inject, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isRouteWithDrawer = computed(() => !!route.matched.find(m => m.components?.drawer));
const showDrawer = ref(false);
const pendingNavigation = ref<(() => void) | null>(null);

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

const selectedMember = computed(() => {
    const id = Number(route.params.id);
    return members.find(member => member.id === id);
});

const editedMember = ref({
    id: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
});

watch(selectedMember, (newMember) => {
    if (newMember) {
        editedMember.value = { ...newMember };
    }
}, { immediate: true });

watch(isRouteWithDrawer, (newValue) => {
    if (newValue) {
        nextTick(() => {
            showDrawer.value = true;
            window.dispatchEvent(new CustomEvent('drawer-opening'));
        });
    } else {
        if (!pendingNavigation.value) {
            showDrawer.value = false;
        }
    }
}, { immediate: true });

onMounted(() => {
    if (showDrawer.value) {
        nextTick(() => {
            document.body.offsetHeight;
        });
    }
});

onUnmounted(() => {
    pendingNavigation.value = null;
});

function saveMember() {
    console.log('Saving member:', editedMember.value);
    alert(`Üye bilgileri güncellendi: ${editedMember.value.firstName} ${editedMember.value.lastName}`);
    closeDrawer();
}

function closeDrawer() {
    showDrawer.value = false;
    window.dispatchEvent(new CustomEvent('drawer-closing'));

    pendingNavigation.value = () => {
        if (router && router.options && router.options.history && router.options.history.state) {
            if (router.options.history.state.back) {
                router.back();
            } else {
                router.push({ name: 'Home' });
            }
        }
    };
}

function onAnimationComplete() {
    if (pendingNavigation.value) {
        const navigate = pendingNavigation.value;
        pendingNavigation.value = null;

        nextTick(() => {
            navigate();
        });
    }
}
</script>

<style>
.drawer-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 998;
}

.drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    pointer-events: auto;
}

.drawer.dark-theme {
    position: fixed;
    top: 0;
    right: 0;
    width: 520px;
    height: 100vh;
    background: #23272f;
    box-shadow: -2px 0 24px rgba(0, 0, 0, 0.45);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    overflow: hidden;
    pointer-events: auto;
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    border-right: none;
    transition: box-shadow 0.3s, transform 0.3s;
    overflow-x: hidden;
}

.drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 32px 12px 32px;
    border-bottom: 1px solid #31343c;
    background: transparent;
}

.drawer-header h2 {
    margin: 0;
    font-size: 1.7rem;
    color: #fff;
    font-weight: 700;
    letter-spacing: -1px;
}

.close-icon {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #aaa;
    padding: 0;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s, color 0.2s;
}

.close-icon:hover {
    background: #31343c;
    color: #fff;
}

.drawer-content {
    padding: 32px;
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    max-width: 100%;
}

.member-form {
    color: #fff;
    box-sizing: border-box;
    max-width: 100%;
}

.form-group {
    margin-bottom: 28px;
    box-sizing: border-box;
    max-width: 100%;
}

.form-group label {
    text-align: left;
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #bfc7d5;
    font-size: 1.05rem;
    letter-spacing: 0.01em;
}

.form-control.dark-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #31343c;
    border-radius: 10px;
    font-size: 1.08rem;
    background: #31343c;
    color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
    box-shadow: none;
    box-sizing: border-box;
    max-width: 100%;
}

.form-control.dark-input:focus {
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.15);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 14px;
    margin-top: 38px;
}

.btn {
    padding: 12px 28px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.08rem;
    font-weight: 500;
    transition: background 0.3s, color 0.3s;
}

.btn-cancel {
    background: #2c2f36;
    color: #bfc7d5;
    border: 1.5px solid #31343c;
}

.btn-cancel:hover {
    background: #23272f;
    color: #fff;
}

.btn-save {
    background: #4CAF50;
    color: #fff;
}

.btn-save:hover {
    background: #43a047;
}

.not-found {
    color: #e74c3c;
    text-align: center;
    padding: 20px;
}

.slide-drawer-enter-active {
    transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
}

.slide-drawer-leave-active {
    transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
}

.slide-drawer-enter-from,
.slide-drawer-leave-to {
    transform: translateX(100%);
}

.drawer-backdrop-fade-enter-active {
    transition: opacity 0.3s cubic-bezier(.4, 0, .2, 1);
}

.drawer-backdrop-fade-leave-active {
    transition: opacity 0.3s cubic-bezier(.4, 0, .2, 1);
}

.drawer-backdrop-fade-enter-from,
.drawer-backdrop-fade-leave-to {
    opacity: 0;
}
</style>