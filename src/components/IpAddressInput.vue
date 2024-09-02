<template>
  <div class="ip-search">
    <span class="ip-search__title text-white rubik-600">IP Address Tracker</span>
  
    <div class="flex items-center ip-search__container justify-center">
      <input type="text" v-model="ipAddress" @keyup.enter="onSearch" placeholder="Search for any IP address or domain"
        class="border px-3 ip-search__input">
  
      <button @click="onSearch" class="bg-black hover:bg-stone-800 text-white font-bold px-5 ip-search__button">
        <IconArrow />
      </button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import IconArrow from "../lib/IconArrow.vue";

export default defineComponent({
  name: 'IpAddressInput',
  components: { IconArrow },
  emits: ['search'],
  setup(_, { emit }) {
    const ipAddress = ref<string>('');

    const onSearch = () => {
      if (ipAddress.value) {
        emit('search', ipAddress.value);
      }
    };

    return {
      ipAddress, onSearch
    };
  },
});
  </script>

  <style scoped>
.ip-search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  
  .ip-search__title {
    font-size: 30px !important;
    padding-top: 18px;
    padding-bottom: 22px;
    letter-spacing: .5px;
  }
  
  .ip-search__container {
    width: 100vw;
    padding: 0 17px;
  }
  
  .ip-search__input {
    height: 58px;
    width: 490px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    cursor: pointer;
    border: 2px solid #f1f1f3;
    position: relative;
    outline: none;
  }
  
  .ip-search__button {
    height: 58px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
</style>