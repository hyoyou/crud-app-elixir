import { mount, shallowMount } from '@vue/test-utils'
import Home from '@/components/Home.vue'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Home, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch('new message')
  })

  it('renders a form to add to the bucket list', () => {
    const wrapper = mount(Home)
    expect(wrapper.html()).toContain('<form>')
  })
})