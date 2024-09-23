import { defineStore } from "pinia";

interface Category {
  id: string;
  name: string;
  children?: Category[];
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as Category[],
    selectedCategories: [] as Category[],
    executeSelectedCategories: { categories: [] as string[] },
  }),
  actions: {
    async fetchCategories(categories: Category[]) {
      this.categories = categories;
    },

    selectCategory(category: Category) {
      const index = this.selectedCategories.findIndex( (cat) => cat.id === category.id );
      if (index > -1) {
        if (category.children) {
          this.selectChildren(category.children);
        }
        this.selectedCategories.splice(index, 1);
      } else {
        this.selectedCategories.push(category);
        if (category.children) {
          this.selectedCategories.push(...category.children);
        }
      }
    },

    // Рекурсивно
    selectChildren(children) {
      children.forEach((child) => {
        const index = this.selectedCategories.findIndex( (cat) => cat.id === child.id );
        if (index > -1) {
          this.selectedCategories.splice(index, 1);
        }
        if (child.children) {
          this.selectChildren(child.children);
        }
      });
    },
    //
    
    removeCategory(category: Category) {
      const index = this.selectedCategories.findIndex( (cat) => cat.id === category.id );
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    },

    getSelectedCategoryIds() {
      this.executeSelectedCategories.categories = [];
      this.selectedCategories.map((cat) => {
        this.executeSelectedCategories.categories.push(cat.id);
      });
    },
  },
});
