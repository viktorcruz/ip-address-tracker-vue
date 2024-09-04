<template>
  <div v-if="ipData"
    class="ip-tracker__results relative flex flex-row mt-6 text-gray-700 bg-white shadow-2xl bg-clip-border rounded-xl">
    <div class="flex flex-col ip-tracker__result text-left">
      <h3>IP ADDRESS:</h3>
      <p class="rubik-700">{{ ipData?.ip }}</p>
    </div>
    <div class="flex flex-col ip-tracker__result text-left">
      <h3>LOCATION:</h3>
      <p class="rubik-700">{{ ipData?.location }}</p>
    </div>
    <div class="flex flex-col ip-tracker__result text-left">
      <h3>TIMEZONE:</h3>
      <p class="rubik-700">{{ ipData?.timezone }}</p>
    </div>
    <div class="flex flex-col ip-tracker__result text-left">
      <h3>ISP:</h3>
      <p class="rubik-700">{{ ipData?.isp }}</p>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from 'vue';

export interface IpData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
}

export default defineComponent({
  name: 'IpAddressDetails',
  props: {
    ipData: {
      type: Object as () => IpData | null,
      required: true
    }
  },
});
  </script>
  
  <style lang="css">
.ip-tracker {
    text-align: center;
    padding: 20px;
  }
  
  .ip-tracker__container {
    background-color: #fff;
  }
  
  .ip-tracker__results {
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    margin: 0;
    max-width: 1024px;
    padding: 0;
    position: fixed;
    top: 200px;
    width: 100%;
    z-index: 10;
  
  }
  
  .ip-tracker__result {
    height: 115px;
    width: 280px;
    text-align: left;
    padding: 12px 20px;
  }
  
  .ip-tracker__result:first-child {
    border-right: .12rem solid #e8e8e8;
  }
  
  .ip-tracker__result:not(:last-child) {
    border-right: .12rem solid #e8e8e8;
  }
  
  
  .ip-tracker__result h3 {
    color: #666;
    margin-bottom: 5px;
    font-size: 15px;
  }
  
  .ip-tracker__result p {
    font-size: 18px;
    letter-spacing: 2px;
    line-height: 1.2;
  }
</style>