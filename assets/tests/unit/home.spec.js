import { shallowMount } from '@vue/test-utils'
import BucketList from '@/components/BucketList.vue'
jest.mock('axios')
import axios from 'axios';

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

  it('makes a GET request to the correct API endpoint for the index page', () => {
    shallowMount(BucketList)
    const uri = axios.getLastURI()

    expect(uri).toEqual('/api/goals')
  })

  it('retrieves all the goals from the index action', () => {
    const wrapper = shallowMount(BucketList)
    const expected = [
      { id: 1,
        activity: 'swim with sharks',
        is_achieved: false,
        location: 'the Bahamas' },
      { id: 2,
        activity: 'feed flamingos',
        is_achieved: false,
        location: 'Aruba' } 
    ]

    expect(wrapper.vm.fetchGoals()).resolves.toEqual(expected);
  })

  it('calls the postGoal function when the "submit" button is clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal');
    const wrapper = shallowMount(BucketList);
    wrapper.find('#submit-btn').trigger('click');

    expect(spy).toHaveBeenCalled();
  })

  it('sets the correct activity data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-activity]').setValue('cool activity')
  
    expect(wrapper.vm.activity).toEqual('cool activity');
  })

  it('sets the correct location data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-location]').setValue('awesome place')
    
    expect(wrapper.vm.location).toEqual('awesome place');
  })

  it('does not call the postGoal function when the button isn\'t clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'postGoal')
    shallowMount(BucketList)

    expect(spy).not.toHaveBeenCalled()
  })

  it('makes a POST request to the correct API endpoint with correct data for a new goal', (done) => {
    const wrapper = shallowMount(BucketList)
    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      const uri = axios.getLastURI();
      const goal = axios.getLastGoal();
      const header = axios.getLastHeader();
      expect(uri).toEqual('/api/goals');
      expect(goal).toEqual({"goal": { activity: 'sample activity', location: 'sample location'}});
      expect(header).toEqual({"headers": {'Content-type': 'application/json'}});
      done()
    })
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
    wrapper.find('#achieved-btn-1').trigger('click')

    expect(spy).toHaveBeenCalled();
  })

  it('receives the id of the goal when "achieved" button is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal')
    const wrapper = shallowMount(BucketList)

    await wrapper.vm.fetchGoals()
    wrapper.find('#achieved-btn-1').trigger('click')

    expect(spy).toHaveBeenCalledWith(1);
  })

  it('makes a PATCH request to the correct API endpoint with correct data to update a goal', async (done) => {
    const wrapper = shallowMount(BucketList)
    
    await wrapper.vm.fetchGoals()
    wrapper.find('#achieved-btn-1').trigger('click')

    wrapper.vm.$nextTick(() => {
      const uri = axios.getLastURI();
      const goal = axios.getLastGoal();
      const header = axios.getLastHeader();
      expect(uri).toEqual('/api/goals/1');
      expect(goal).toEqual({"goal": { is_achieved: true }});
      expect(header).toEqual({"headers": {'Content-type': 'application/json'}});
      done()
    })
  })

  it('makes a call to the update action in the API when button to mark "achieved" is clicked and returns only current goals', async (done) => {
    const wrapper = shallowMount(BucketList)

    await wrapper.vm.fetchGoals()
    wrapper.find('#achieved-btn-1').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([
        { 
          "id": 2,
          "activity": "feed flamingos",
          "is_achieved": false,
          "location": "Aruba"
        }
      ])
      done()
    })
  })
})