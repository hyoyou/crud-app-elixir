import { shallowMount } from '@vue/test-utils'
import BucketList from '@/components/BucketList.vue'
jest.mock('axios')

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

describe('BucketList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(BucketList, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch('new message')
  })

  it('renders a form to add to the bucket list', () => {
    const wrapper = shallowMount(BucketList)
    expect(wrapper.html()).toContain('<form>')
  })

  it('makes a GET request to the index action of the API when the page is rendered', () => {
    const spy = jest.spyOn(BucketList.methods, 'fetchGoals')
    shallowMount(BucketList)

    expect(spy).toHaveBeenCalled();
  })

  it('retrieves all the goals from the index action', () => {
    const wrapper = shallowMount(BucketList)
    const expected = { 
      goals: [
        { id: 1,
          activity: 'swim with sharks',
          is_achieved: false,
          location: 'the Bahamas' },
        { id: 2,
          activity: 'feed flamingos',
          is_achieved: false,
          location: 'Aruba' } 
      ]
    }

    return expect(wrapper.vm.fetchGoals()).resolves.toEqual(expected);
  })

  it('makes a POST request when the button is clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal')
    const wrapper = shallowMount(BucketList)
    wrapper.find('button').trigger('click')

    expect(spy).toHaveBeenCalled();
  })

  it('does not make a POST request when the button isn\'t clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal')
    shallowMount(BucketList)

    expect(spy).not.toHaveBeenCalled()
  })

  it('makes a call to the post action of the API when user fills out the form and the button is clicked', done => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-activity]').setValue('sample activity')
    wrapper.find('[data-location]').setValue('sample location')
    wrapper.find('button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([{ activity: 'sample activity', location: 'sample location'}])
      done()
    })
  })
})