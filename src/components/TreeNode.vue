<script setup type="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select']);

const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

const isExpanded = ref(true);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

function selectNode() {
  emit('select', props.node);
}
</script>

<template>
 <div class="node">
    <div class="node-content" @click="selectNode" :class="{ 'node-selected': node.selected }" >
      <span class="node-toggle" v-if="hasChildren" @click.stop="toggleExpand">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <slot :node="node">
        {{ node.name }}
      </slot>
    </div>

    <transition name="expand">
      <div v-if="isExpanded && hasChildren" class="children">
        <TreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          @select="$emit('select', $event)"
        >
          <template #default="node">
            <slot :node="node"></slot>
          </template>
        </TreeNode>
      </div>
    </transition>
  </div>

  
</template>

<style scoped>

.node {
  margin-left: 20px;
}

.node-content {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  transition: background-color 0.3s;
}

.node-content:hover {
  background-color: #f0f0f0;
}

.node-selected {
  font-weight: bold;
  background-color: #e6f7ff;
}

.node-toggle {
  margin-right: 5px;
  font-size: 12px;
  width: 15px;
  text-align: center;
}

.children {
  margin-left: 10px;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>