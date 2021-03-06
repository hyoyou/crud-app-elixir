import { shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import BucketList from '@/components/BucketList.vue';
import HEADERS from '@/constants/http.js';
import PromiseFactory from '../helpers/promiseFactory.js';
jest.mock('axios');
import axios from 'axios';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  let promise = PromiseFactory.createResolve({
    'data': {
      'data': [
        { 
          'id': 1,
          'activity': 'swim with sharks',
          'is_achieved': false,
          'location': 'the Bahamas'
        },
        { 
          'id': 2,
          'activity': 'feed flamingos',
          'is_achieved': false,
          'location': 'Aruba'
        }
      ]
    }
  });
  axios.get.mockReturnValue(promise);
});

describe('BucketList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(BucketList, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch('new message');
  });

  it('renders a form to add to the bucket list', () => {
    const wrapper = shallowMount(BucketList);
    expect(wrapper.html()).toContain('<form id="new-goal">');
  });

  it('calls a function that makes a GET request to the index action of the API when the page is rendered', () => {
    const spy = jest.spyOn(BucketList.methods, 'fetchGoals');
    shallowMount(BucketList);

    expect(spy).toHaveBeenCalled();
  });

  it('sends the correct API endpoint when it makes a request to the API for the index page', () => {
    shallowMount(BucketList);
    const uri = axios.getLastURI();

    expect(uri).toEqual('/api/goals');
  });

  it('retrieves all the current goals from the index action', async (done) => {
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();

    wrapper.vm.$nextTick(() => {
      const expected = [
        { id: 1,
          activity: 'swim with sharks',
          is_achieved: false,
          location: 'the Bahamas' },
        { id: 2,
          activity: 'feed flamingos',
          is_achieved: false,
          location: 'Aruba' } 
      ];
      
      expect(wrapper.vm.goals).toEqual(expected);
      done();
    });
  });

  it('returns an error if the request fails to fetch index page', (done) => {
    let promise = PromiseFactory.createReject('Fetch failed');
    axios.get.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.errors).toEqual(['Fetch failed']);
        done();
      });
    });
  
  });

  it('calls the form validator when the "submit" button is clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'checkForm');
    const wrapper = shallowMount(BucketList);
    wrapper.find('#submit-btn').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('sets the correct activity data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList);
    wrapper.find('[data-activity]').setValue('cool activity');
  
    expect(wrapper.vm.activity).toEqual('cool activity');
  });

  it('sets the correct location data to persist when the form is filled', () => {
    const wrapper = shallowMount(BucketList);
    wrapper.find('[data-location]').setValue('awesome place');
    
    expect(wrapper.vm.location).toEqual('awesome place');
  });

  it('does not call the form validator or send off a create action when the button isn\'t clicked', () => {
    const spyValidate = jest.spyOn(BucketList.methods, 'checkForm');
    const spyPost = jest.spyOn(BucketList.methods, 'postGoal');
    shallowMount(BucketList);

    expect(spyValidate).not.toHaveBeenCalled();
    expect(spyPost).not.toHaveBeenCalled();
  });

  it('displays an error when activity is missing in the form', (done) => {
    const wrapper = shallowMount(BucketList);
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.length).toEqual(1);
      expect(wrapper.text()).toMatch('Please correct the following error(s): Activity is required.');
      done();
    });
  });

  it('displays an error when location is missing in the form', (done) => {
    const wrapper = shallowMount(BucketList);
    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.length).toEqual(1);
      expect(wrapper.text()).toMatch('Please correct the following error(s): Location is required.');
      done();
    });
  });

  it('displays errors when both activity and location are missing in the form', (done) => {
    const wrapper = shallowMount(BucketList);
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.length).toEqual(2);
      expect(wrapper.text()).toMatch('Please correct the following error(s): Activity is required.Location is required.');
      done();
    });
  });

  it('sends the correct data when it makes a request to the API for a new goal', (done) => {
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      const uri = axios.getLastURI();
      const goal = axios.getLastGoal();
      const header = axios.getLastHeader();
      expect(uri).toEqual('/api/goals');
      expect(goal).toEqual({'goal': { activity: 'sample activity', location: 'sample location'}});
      expect(header).toEqual(HEADERS);
      done();
    });
  });

  it('makes a call to the create action of the API when user fills out the form and clicks "submit"', (done) => {
    let promise = PromiseFactory.createResolve({
      'data': {
        'data': { 
          'id': 3,
          'activity': 'sample activity',
          'is_achieved': false,
          'location': 'sample location'
        }
      }
    });
    axios.post.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([
        { 
          'id': 1,
          'activity': 'swim with sharks',
          'is_achieved': false,
          'location': 'the Bahamas'
        },
        { 
          'id': 2,
          'activity': 'feed flamingos',
          'is_achieved': false,
          'location': 'Aruba'
        },
        { 
          'id': 3,
          'activity': 'sample activity',
          'is_achieved': false,
          'location': 'sample location'
        }
      ]);
      done();
    });
  });

  it('returns an error if the API returns an error creating a new goal', (done) => {
    let promise = PromiseFactory.createReject('Creating a new goal failed');
    axios.post.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.errors).toEqual(['Creating a new goal failed']);
        done();
      });
    });
  });

  it('calls a function to update a goal when button to mark "achieved" is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal');
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#achieved-btn-1').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('receives the id of the goal when "achieved" button is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal');
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#achieved-btn-1').trigger('click');

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('sends the correct API endpoint and data when it makes a request to the API to update a goal', async (done) => {
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    
    await wrapper.vm.fetchGoals();
    wrapper.find('#achieved-btn-1').trigger('click');

    wrapper.vm.$nextTick(() => {
      const uri = axios.getLastURI();
      const goal = axios.getLastGoal();
      const header = axios.getLastHeader();
      expect(uri).toEqual('/api/goals/1');
      expect(goal).toEqual({'goal': { id: 1, is_achieved: true }});
      expect(header).toEqual(HEADERS);
      done();
    });
  });

  it('redirects to the achieved index page when a goal is marked as "achieved"', async (done) => {
    const router = new VueRouter();
    let promise = PromiseFactory.createResolve('Success');
    axios.patch.mockReturnValue(promise);

    const spy = jest.spyOn(BucketList.methods, 'redirect');
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, 
      { propsData: { httpClient } },
      { router }
    );

    await wrapper.vm.fetchGoals();
    wrapper.find('#achieved-btn-1').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledWith('achieved');

      done();
    });
  });

  it('returns an error if the API returns an error updating goal', async (done) => {
    let promise = PromiseFactory.createReject('Updating goal failed');
    axios.patch.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#achieved-btn-1').trigger('click');

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.errors).toEqual(['Updating goal failed']);
        done();
      });
    });
  });

  it('calls the deleteGoal function when button to mark "delete" is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'deleteGoal');
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#delete-btn-1').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('receives the id of the goal when the "delete" button is clicked', async () => {
    const spy = jest.spyOn(BucketList.methods, 'deleteGoal');
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#delete-btn-1').trigger('click');

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('sends the correct goal id when it makes a request to the API to delete a goal', async (done) => {
    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    
    await wrapper.vm.fetchGoals();
    wrapper.find('#delete-btn-1').trigger('click');

    wrapper.vm.$nextTick(() => {
      const uri = axios.getLastURI();
      const goal = axios.getLastGoal();
      const header = axios.getLastHeader();
      expect(uri).toEqual('/api/goals/1');
      expect(goal).toEqual({'goal': { id: 1 }});
      expect(header).toEqual(HEADERS);
      done();
    });
  });

  it('rerenders current goals in the Current Goals index page when a goal is deleted', async (done) => {
    let promise = PromiseFactory.createResolve({
      'data': {
        'data': [
          { 
            'id': 2,
            'activity': 'feed flamingos',
            'is_achieved': false,
            'location': 'Aruba'
          }
        ]
      }
    });
    axios.delete.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    
    await wrapper.vm.fetchGoals();
    wrapper.find('#delete-btn-1').trigger('click');

    await wrapper.vm.deleteGoal(1);

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([
        { id: 2,
          activity: 'feed flamingos',
          is_achieved: false,
          location: 'Aruba' }
      ]);
      done();
    });
  });

  it('returns an error if the API returns an error deleting goal', async (done) => {
    let promise = PromiseFactory.createReject('Deleting goal failed');
    axios.delete.mockReturnValue(promise);

    const httpClient = axios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    await wrapper.vm.fetchGoals();
    wrapper.find('#delete-btn-1').trigger('click');
    
    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.errors).toEqual(['Deleting goal failed']);
        done();
      });
    });
  });
});