import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TreeNode from '@/components/TreeNode.vue'
import { useCategoryStore } from '@/stores/categoryStore'

describe('TreeNode', () => {
  const createWrapper = (node) => {
    return mount(TreeNode, {
      props: { node },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            category: {
              selectedCategories: []
            }
          }
        })]
      }
    })
  }

  it('renders a node without children', () => {
    const wrapper = createWrapper({ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' })
    expect(wrapper.find('.node-name').text()).toBe('Europe')
    expect(wrapper.find('.expand-icon').exists()).toBe(false)
  })

  it('renders a node with children', () => {
    const wrapper = createWrapper({
      id: '687086d9-e6b9-40a2-a226-5834c67a781d',
      name: 'Europe',
      children: [{ id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' }]
    })
    expect(wrapper.find('.expand-icon').exists()).toBe(true)
    expect(wrapper.find('.child-nodes').exists()).toBe(true)
  })

  it('toggles expansion when clicked', async () => {
    const wrapper = createWrapper({
        id: '687086d9-e6b9-40a2-a226-5834c67a781d',
        name: 'Europe',
        children: [{ id: '487086d9-e6b9-40a2-a226-5834c67a781d', name: 'Ukraine' }]
    })
    
    await wrapper.find('.expand-icon').trigger('click')
    expect(wrapper.find('.child-nodes').isVisible()).toBe(false)

    await wrapper.find('.expand-icon').trigger('click')
    expect(wrapper.find('.child-nodes').isVisible()).toBe(true)
  })

  it('selects and deselects a node', async () => {
    const wrapper = createWrapper({ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' })
    const store = useCategoryStore()

    store.selectedCategories = [{ id: '687086d9-e6b9-40a2-a226-5834c67a781d', name: 'Europe' }]
    await wrapper.vm.$nextTick()

    await wrapper.find('.checkbox').trigger('click')
    expect(store.removeCategory).toHaveBeenCalled()
  })
})