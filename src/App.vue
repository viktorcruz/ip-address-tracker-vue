<script setup lang="ts">
import { ref } from 'vue';
import IpAddressMap, { MapCoordinates } from "./components/IpAddressMap.vue";
import Header from './components/Header.vue'
import Footer from "./components/Footer.vue";

const coordinates = ref<MapCoordinates | null>(null);
const errorMessage = ref<string | null>(null);
const updateCoordinates = (newCoordinates: MapCoordinates | null) => {
  if(newCoordinates){
    coordinates.value = newCoordinates;
  } else {
    errorMessage.value = 'Invalid coordinates';
  }
};
</script>

<template>
  <div>
    <Header @updateCoordinates="updateCoordinates" />
    <main>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <IpAddressMap v-if="coordinates" :coordinates="coordinates!" />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
