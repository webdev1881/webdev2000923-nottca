<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Tag {
  name: string
  color?: string
}

const props = defineProps<{
  tags: Tag[]
}>()

const emit = defineEmits<{
  (e: 'removeTag', index: number): void
}>()

const getBackgroundColor = (tag: Tag): string => {
  return tag.color || getRandomColor()
}

const getTextColor = (tag: Tag): string => {
  const backgroundColor = getBackgroundColor(tag)
  const r = parseInt(backgroundColor.slice(1, 3), 16)
  const g = parseInt(backgroundColor.slice(3, 5), 16)
  const b = parseInt(backgroundColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
</script>

<template>
  <div class="tags-container">
    <span
      v-for="(tag, index) in tags"
      :key="index"
      class="tag"
      :style="{ backgroundColor: getBackgroundColor(tag), color: getTextColor(tag) }"
    >
      {{ tag.name }}
      <button
        class="delete-button"
        @click="$emit('removeTag', tag)"
        :style="{ color: getTextColor(tag) }"
      >
        ×
      </button>
    </span>
  </div>
</template>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.tag:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
  padding: 0 4px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.delete-button:hover {
  opacity: 1;
}
</style>