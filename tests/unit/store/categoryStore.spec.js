import { setActivePinia, createPinia } from 'pinia'
import { useCategoryStore } from '@/stores/categoryStore'

describe('Category Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCategoryStore()
  })

  it('fetches categories', async () => {
    await store.fetchCategories()
    logger.info(store.categories)
    expect(store.categories).toHaveLength(2)
    expect(store.categories[0].name).toBe('Europe')
  })

  it('selects a category', () => {
    const category = { id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' }
    store.selectCategory(category)
    expect(store.selectedCategories).toContain(category)
  })

  it('selects children categories', () => {
    const parentCategory = {
      id: '487086d9-e6b9-40a2-a226-5834c67a781d',
      name: 'Ukraine',
      children: [
        { id: '9a434c91-13ee-4e19-94c1-47b2f95d7461', name: 'Kharkivska' },
      ]
    }
    store.selectCategory(parentCategory)
    expect(store.selectedCategories).toHaveLength(2)
    expect(store.selectedCategories.map(c => c.id)).toEqual(['9a434c91-13ee-4e19-94c1-47b2f95d7461'])
  })

  it('removes a category', () => {
    const category = { id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' }
    store.selectCategory(category)
    store.removeCategory(category)
    expect(store.selectedCategories).not.toContain(category)
  })


})