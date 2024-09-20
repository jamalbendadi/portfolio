<template>
    <Transition name="slide-fade">
        <div class="flex gap-2 py-1 align-bottom" v-if="toggledToShow">
            <div class="flex align-bottom gap-2">
                <div class="flex flex-col">
                    <div>
                        <span v-if="!isValid" class="text-red-600 text-xs bg-black px-2 py-1 rounded-lg">Please give a valid
                            input.</span>
                    </div>
                    <textarea v-on:change="() => isValid = true" v-model="messageToBeSent"
                        class="mt-auto border border-purple-800 bg-gray-950 text-white" />
                </div>
                <div class="mt-auto flex flex-col">
                    <Tooltip class="ml-auto"
                        content="Leave a message! It will reach me personally. Leave some feedback about this website for example!"
                        position="left">
                        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Tooltip>
                    <button class="btn btn-primary border-purple-800 border mt-1"
                    v-on:click="sendMessage" 
                    :disabled="isSendDisabled">{{isSendDisabled ? "Thanks!" : "Send"}}</button>
                </div>
            </div>
        </div>
    </Transition>
    <div class="flex mt-4">
        <button class="ml-auto rounded-full border-2 border-white hover:bg-purple-950"
            v-on:click="() => toggledToShow = !toggledToShow">
            <svg class="w-5 h-5 text-white transition-transform duration-300" :class="{
                'rotate-180': toggledToShow,
                'rotate-0': !toggledToShow
            }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m7 16 4-4-4-4m6 8 4-4-4-4" />
            </svg>
        </button>
    </div>
</template>
<script setup lang="ts">
import { createItem } from '@directus/sdk';
const { $directus } = useNuxtApp()
const toggledToShow = ref(true)
const messageToBeSent = ref('')
const isValid = ref(true)
const isSendDisabled = ref(false)

async function sendMessage() {
    try {
        if (messageToBeSent.value == null || !/\b\w{3,}\b/g.test(messageToBeSent.value)) {
            isValid.value = false
            return
        }
        await $directus.request(createItem('messages', {
            message: messageToBeSent.value
        }))
        isSendDisabled.value = true;
    }
    catch (e) {
        isValid.value = false;
        console.log(e)
    }
    messageToBeSent.value = '';
}
</script>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
}
</style>