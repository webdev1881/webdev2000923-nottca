<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TreeCategory from '@/components/TreeCategory.vue'
import { useCategoryStore } from './stores/categoryStore';
const store = useCategoryStore();


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/categories');
    const serverData = await response.json();
    const { data } = serverData;
    store.fetchCategories(data);
  } catch (error) {
    console.error('Error data:', error);
  }
});
</script>

<template>

  <main class=test>
    <TreeCategory />
    <div class="execute-selected">
      <button class="execute-selected_btn" @click="store.getSelectedCategoryIds">Execute selected</button>
      <pre>{{ store.executeSelectedCategories }}</pre>
    </div>
  </main>

</template>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
.execute-selected {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.execute-selected_btn {
  background-color: #4CAF50;
  width: 100%;
  border: none;
  color: white;
  padding: 15px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  margin-bottom: 20px;
}
.execute-selected_btn:hover {
  background-color: #45a049;
}
</style>
