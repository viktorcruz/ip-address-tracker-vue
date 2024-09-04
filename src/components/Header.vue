<script setup lang="ts">
import { ref } from 'vue';
import IpAddressDetails, { IpData } from "./IpAddressDetails.vue";
import IpAddressInput from "./IpAddressInput.vue";

let errorMessage = ref<string | null>(null);
const ipData = ref<IpData | null>(null);
const emit = defineEmits(['updateCoordinates']);

class CustomError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }
}

const resolveDomain = async (domain: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://ip-address-tracker-vue-backend.onrender.com/resolve?domain=${domain}`);
    const data = await response.json();

    if (data && data.ip) {
      return data.ip;
    } else {
      throw new CustomError(404, 'Domain could not be resolved')
    }
  } catch (error) {
    throw new CustomError(500, 'Failed to resolve domain')
  }
}

const getIpDetails = async (query: string) => {
  try {
    let ipAddress = query;
    errorMessage.value = null;

    if (isNaN(Number(query.split('.').join('')))) {
      const resolveIp = await resolveDomain(query);

      if (!resolveIp) {
        throw new CustomError(400, 'Could not resolve the domain');
      }

      ipAddress = resolveIp;
    }

    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    const data = await response.json();

    if (data.error || data.resolved) {
      throw new Error(data.reason || 'IP address is reserved or cannot be found');
    }

    ipData.value = {
      ip: data.ip,
      location: `${data.city}, ${data.region}, ${data.country_name}, ${data.postal}`,
      timezone: data.utc_offset,
      isp: data.org,
    };

    emit('updateCoordinates', {
      lat: data.latitude,
      lng: data.longitude,
    });
  }
  catch (error) {
    if (error instanceof CustomError) {
      console.log('Custom error code: ', error.code);
      console.log('Error message: ', error.message);
    }
    else if (error instanceof Error) {
      console.log('Standard error: ', error.message);
    }
    else {
      console.log('unexpected error: ', error);
    }
    ipData.value = null;
    errorMessage.value = 'An unknown error ocurred';
    emit('updateCoordinates', null);
  }
}
</script>

<template>
  <header class="header-container">
    <IpAddressInput @search="getIpDetails" />
  </header>
  <section class="section-details">
    <IpAddressDetails v-if="ipData" :ipData="ipData" />
  </section>
</template>

<style scoped>
.header-container {
  min-height: 281px;
  background-image: url('/images/pattern-bg-desktop.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: sticky !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
}

.section-details {
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0 20px;
  z-index: 1000;
}
</style>