<script setup type="ts">
import { ref, computed, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore';
import TreeNode from './TreeNode.vue';
import Tag from './UI/Tag.vue';

const store = useCategoryStore();

const searchQuery = ref('');

const filteredTree = computed(() => {
  if (!searchQuery.value) return store.categories;
  return filterTree(store.categories, searchQuery.value.toLowerCase());
});

function filterTree(tree, query) {
  return tree.filter(node => {
    const matchesQuery = node.name.toLowerCase().includes(query);
    const hasMatchingChildren = node.children && filterTree(node.children, query).length > 0;
    return matchesQuery || hasMatchingChildren;
  }).map(node => ({
    ...node, children: node.children ? filterTree(node.children, query) : []
  }));
}

const removeCategory = (tag) => {
  store.removeCategory(tag)
}

onMounted(async () => {
  await store.fetchCategories();
});
</script>


<template>
  <div class="category-tree">
    <input
      class="search"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Live Search..."
    />
    
    <Tag 
      :tags="store.selectedCategories" 
      @removeTag="removeCategory" 
      class="tags"
      v-if="store.selectedCategories?.length"
     />
    <div v-else class="empty"> EMPTY SELECT </div>

    <div class="tree-root" v-if="searchQuery.length">
      <TreeNode
        v-for="node in filteredTree"
        :key="node.id"
        :node="node"
        @select="store.selectCategory"
      >
        <template #default="node">
          <slot :node="node"></slot>
        </template>
      </TreeNode>
    </div>
  </div>
</template>



<style scoped>
.category-tree {
  font-family: Arial, sans-serif;
  color: #333;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.tree-root {
  margin: 0 auto;
  width: 328px;
}
.search {
  padding: 5px;
  width: 300px;
  margin: 15px auto;
}
.tags {
  min-height: 35px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
}
.empty {
  min-height: 35px;
  text-align: center;
  color: #9c9b9b;
}
</style>