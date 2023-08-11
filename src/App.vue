

<template>
  <div class="d-flex flex-column vh-100 ">
    <header>
      <NavbarComponent />
    </header>

    <main class="">
      <div class="p-sm-5 h-100">

        <RouterView />
      </div>


    </main>
  </div>
</template>
<script setup>

import NavbarComponent from './components/NavbarComponent.vue'

import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'


const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
console.log('p', user.value)


</script>

<style scoped>
main {
  flex: 1 0 0;
  min-height: 0;

}
</style>

