<template>
    <div class="modal-content-wrapper">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="modal-actions">
            <button class="btn btn-cancel" @click="onCancel">İptal</button>
            <button class="btn btn-confirm" @click="onConfirm">Onayla</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Modal İçeriği'
    },
    message: {
        type: String,
        default: 'Bu bir modal içeriğidir.'
    },
    id: {
        type: [String, Number],
        default: null
    }
});

const emit = defineEmits(['cancel', 'confirm']);

const onCancel = () => {
    emit('cancel');
};

const onConfirm = () => {
    emit('confirm', props.id);
};
</script>

<style scoped>
.modal-content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

h3 {
    margin: 0;
    color: #ffffff;
    font-size: 18px;
}

p {
    margin: 0;
    color: #e3e3e3;
    line-height: 1.5;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 16px;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s;
}

.btn-cancel {
    background-color: #31343c;
    color: #ffffff;
}

.btn-cancel:hover {
    background-color: #3e4249;
}

.btn-confirm {
    background-color: #0074e4;
    color: #ffffff;
}

.btn-confirm:hover {
    background-color: #0064c8;
}
</style>