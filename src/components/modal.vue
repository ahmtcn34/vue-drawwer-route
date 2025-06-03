<template>
    <div class="modal-container">
        <transition name="fade-modal" @after-leave="onAnimationComplete">
            <div v-if="showModal" class="modal dark-theme">
                <div class="modal-header">
                    <h2>{{ modalTitle }}</h2>
                    <button @click="closeModal" class="close-icon">&times;</button>
                </div>
                <div class="modal-content">
                    <modal-content v-if="route.params.modalType" :title="getModalTitle()" :message="getModalMessage()"
                        :id="route.params.id" @cancel="closeModal" @confirm="handleConfirm" />
                    <slot v-else></slot>
                </div>
            </div>
        </transition>
        <transition name="modal-backdrop-fade">
            <div v-if="showModal" class="modal-backdrop" @click="closeModal"></div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ModalContent from './modal-content.vue';
import { closeModal as closeModalHelper } from '@/utils/modalHelper';

const router = useRouter();
const route = useRoute();

const props = defineProps({
    title: {
        type: String,
        default: 'Modal'
    }
});

const modalTitle = computed(() => {
    if (route.params.modalType === 'confirm') {
        return 'Onay';
    } else if (route.params.modalType === 'info') {
        return 'Bilgi';
    } else if (route.params.modalType === 'warning') {
        return 'Uyarı';
    } else {
        return props.title;
    }
});

const isRouteWithModal = computed(() => !!route.matched.find(m => m.components?.modal));
const showModal = ref(false);
const pendingNavigation = ref<(() => void) | null>(null);

function getModalTitle() {
    if (route.params.modalType === 'confirm') {
        return 'İşlemi onaylıyor musunuz?';
    } else if (route.params.modalType === 'info') {
        return 'Bilgilendirme';
    } else if (route.params.modalType === 'warning') {
        return 'Dikkat!';
    } else {
        return 'Modal İçeriği';
    }
}

function getModalMessage() {
    if (route.params.modalType === 'confirm') {
        return 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?';
    } else if (route.params.modalType === 'info') {
        return 'Bu bir bilgilendirme mesajıdır.';
    } else if (route.params.modalType === 'warning') {
        return 'Bu işlem geri alınamaz!';
    } else {
        return 'Modal içeriği burada gösterilir.';
    }
}

function handleConfirm(id: string | number | null) {
    console.log('Onaylandı:', id);
    closeModal();
}

watch(isRouteWithModal, (newValue) => {
    if (newValue) {
        nextTick(() => {
            showModal.value = true;
        });
    } else {
        if (!pendingNavigation.value) {
            showModal.value = false;
        }
    }
}, { immediate: true });

onMounted(() => {
    if (showModal.value) {
        nextTick(() => {
            document.body.offsetHeight;
        });
    }
});

onUnmounted(() => {
    pendingNavigation.value = null;
});

function closeModal() {
    showModal.value = false;

    pendingNavigation.value = () => {
        let view = route.meta.view as string;
        if (!view && route.query && route.query.view) {
            view = route.query.view as string;
        }
        closeModalHelper(router, view);
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
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    pointer-events: auto;
}

.modal.dark-theme {
    position: relative;
    width: 500px;
    max-width: 90%;
    max-height: 80vh;
    background: #23272f;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    overflow: hidden;
    pointer-events: auto;
    border-radius: 16px;
    transition: opacity 0.3s, transform 0.3s;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #31343c;
}

.modal-header h2 {
    margin: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
}

.close-icon {
    background: none;
    border: none;
    color: #8f9bab;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
}

.close-icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
}

.modal-content {
    padding: 24px;
    color: #e3e3e3;
    flex-grow: 1;
    overflow-y: auto;
}

.fade-modal-enter-active,
.fade-modal-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-modal-enter-from,
.fade-modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.modal-backdrop-fade-enter-active,
.modal-backdrop-fade-leave-active {
    transition: opacity 0.3s;
}

.modal-backdrop-fade-enter-from,
.modal-backdrop-fade-leave-to {
    opacity: 0;
}
</style>