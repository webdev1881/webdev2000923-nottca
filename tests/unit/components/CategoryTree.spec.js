import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CategoryTree from '@/components/CategoryTree.vue'
import { useCategoryStore } from '@/stores/categoryStore'

describe('CategoryTree', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CategoryTree, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            category: {
              categories: [
                {
                  id: '687086d9-e6b9-40a2-a226-5834c67a781d',
                  name: 'Europe',
                  children: [
                    { id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' },
                    { id: 'e0a7380f-faec-4e4f-a915-35108857685d', name: 'Great britain' },
                  ]
                },
              ]
            }
          }
        })]
      }
    })
  })

  it('renders the category tree', () => {
    expect(wrapper.find('h2').text()).toBe('Категорії')
    expect(wrapper.findAll('.tree-node')).toHaveLength(2)
  })

  it('expands and collapses categories', async () => {
    const firstCategory = wrapper.find('.tree-node')
    await firstCategory.find('.expand-icon').trigger('click')
    expect(firstCategory.find('.child-nodes').exists()).toBe(false)

    await firstCategory.find('.expand-icon').trigger('click')
    expect(firstCategory.find('.child-nodes').exists()).toBe(true)
  })

  it('selects and deselects categories', async () => {
    const store = useCategoryStore()
    const firstCategory = wrapper.find('.tree-node')
    
    await firstCategory.find('.checkbox').trigger('click')
    expect(store.selectCategory).toHaveBeenCalled()

    await firstCategory.find('.checkbox').trigger('click')
    expect(store.removeCategory).toHaveBeenCalled()
  })
})