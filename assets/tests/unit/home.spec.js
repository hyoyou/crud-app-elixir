import { mount, shallowMount } from '@vue/test-utils'
import BucketList from '@/components/BucketList.vue'

describe('BucketList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(BucketList, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch('new message')
  })

  it('renders a form to add to the bucket list', () => {
    const wrapper = mount(BucketList)
    expect(wrapper.html()).toContain('<form>')
  })
})