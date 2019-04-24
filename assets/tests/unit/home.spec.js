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

    expect(wrapper.vm.fetchGoals()).resolves.toEqual(expected);
  })

  it('calls the postGoal function when the "submit" button is clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal')
    const wrapper = shallowMount(BucketList)
    wrapper.find('#submit-btn').trigger('click')

    expect(spy).toHaveBeenCalled();
  })

  it('sets the correct activity data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-activity]').setValue('cool activity')
  
    expect(wrapper.vm.activity).toEqual('cool activity')
  })

  it('sets the correct location data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-location]').setValue('awesome place')
    
    expect(wrapper.vm.location).toEqual('awesome place')
  })

  it('does not call the postGoal function when the button isn\'t clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal')
    shallowMount(BucketList)

    expect(spy).not.toHaveBeenCalled()
  })

  it('makes a call to the create action of the API when user fills out the form and the button is clicked', done => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-activity]').setValue('sample activity')
    wrapper.find('[data-location]').setValue('sample location')
    wrapper.find('#submit-btn').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([{ activity: 'sample activity', location: 'sample location'}])
      done()
    })
  })

  it('calls the updateGoal function when button to mark "achieved" is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal')
    const wrapper = shallowMount(BucketList)

    await wrapper.vm.fetchGoals()
    wrapper.find('#achieved-btn').trigger('click')

    expect(spy).toHaveBeenCalled();
  })

  it('makes a call to the update action in the API when button to mark "achieved" is clicked', async (done) => {
    const wrapper = shallowMount(BucketList)

    await wrapper.vm.fetchGoals()
    wrapper.find('#achieved-btn').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual({
        "goals": [
          { "activity": "swim with sharks", 
            "id": 1, 
            "is_achieved": true, 
            "location": "the Bahamas" }, 
          { "activity": "feed flamingos", 
            "id": 2, 
            "is_achieved": false, 
            "location": "Aruba" }
        ]
      })
      done()
    })
  })
})