import { shallowMount } from '@vue/test-utils';
import AchievedList from '@/components/AchievedList.vue';
import BucketList from '@/components/BucketList.vue';
import MockAxios from '../__mocks__/axios';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
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

  it('calls fuction that fetches the index action of the API when the page is rendered', () => {
    const spy = jest.spyOn(BucketList.methods, 'fetchGoals');
    shallowMount(BucketList);

    expect(spy).toHaveBeenCalled();
  });

  it('makes a GET request to the correct API endpoint for the index page', () => {  
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    const uri = wrapper.vm.http.httpClient.getLastURI();

    expect(uri).toEqual('/api/goals');
  });

  it('retrieves all the goals from the index action', (done) => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
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
      });
      done();
    });
  });

  it('calls the form validator when the "submit" button is clicked', () => {
    const spy = jest.spyOn(BucketList.methods, 'checkForm');
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    wrapper.find('#submit-btn').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('sets the correct activity data to persist when the form is filled', () => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    wrapper.find('[data-activity]').setValue('cool activity');
  
    expect(wrapper.vm.activity).toEqual('cool activity');
  });

  it('sets the correct location data to persist when the form is filled', () => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
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

  it('makes a POST request to the correct API endpoint with correct data for a new goal', (done) => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      const uri = wrapper.vm.http.httpClient.getLastURI();
      const goal = wrapper.vm.http.httpClient.getLastGoal();
      const header = wrapper.vm.http.httpClient.getLastHeader();
      expect(uri).toEqual('/api/goals');
      expect(goal).toEqual({'goal': { activity: 'sample activity', location: 'sample location'}});
      expect(header).toEqual({'HEADERS': {'headers': {'Content-type': 'application/json'}}});
      done();
    });
  });

  it('makes a call to the create action of the API when user fills out the form and the button is clicked', (done) => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    wrapper.find('[data-activity]').setValue('sample activity');
    wrapper.find('[data-location]').setValue('sample location');
    wrapper.find('#submit-btn').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.goals).toEqual([{ activity: 'sample activity', location: 'sample location'}]);
      done();
    });
  });

  it('calls the updateGoal function when button to mark "achieved" is clicked', (done) => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal');
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#achieved-btn-1').trigger('click');

        expect(spy).toHaveBeenCalled();
      });
      done();
    });
  });

  it('receives the id of the goal when "achieved" button is clicked', (done) => {
    const spy = jest.spyOn(BucketList.methods, 'updateGoal');
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#achieved-btn-1').trigger('click');

        expect(spy).toHaveBeenCalledWith(1);
      });
      done();
    });
  });

  it('makes a PATCH request to the correct API endpoint with correct data to update a goal', (done) => {
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#achieved-btn-1').trigger('click');

        wrapper.vm.$nextTick(() => {
          const uri = wrapper.vm.http.httpClient.getLastURI();
          const goal = wrapper.vm.http.httpClient.getLastGoal();
          const header = wrapper.vm.http.httpClient.getLastHeader();
          expect(uri).toEqual('/api/goals/1');
          expect(goal).toEqual({'goal': { id: 1, is_achieved: true }});
          expect(header).toEqual({'HEADERS': {'headers': {'Content-type': 'application/json'}}});
        });
      });
      done();
    });
  });

  it('adds current goals to the Achieved Goals index page when a goal is marked as "achieved"', (done) => {
    const httpClient = MockAxios;
    const wrapperCurrent = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    const wrapperAchieved = shallowMount(AchievedList, {
      propsData: { httpClient }
    });
    
    wrapperCurrent.vm.$nextTick(() => {
      wrapperCurrent.vm.$nextTick(async () => {
        await wrapperCurrent.vm.fetchGoals();
        wrapperCurrent.find('#achieved-btn-1').trigger('click');

        wrapperCurrent.vm.$nextTick(() => {
          expect(wrapperAchieved.vm.goals).toEqual([
            { id: 1,
              activity: 'swim with sharks',
              is_achieved: true,
              location: 'the Bahamas' }
          ]);
        });
      });
      done();
    });
  });

  it('calls the deleteGoal function when button to mark "delete" is clicked', (done) => {
    const spy = jest.spyOn(BucketList.methods, 'deleteGoal');
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#delete-btn-1').trigger('click');

        expect(spy).toHaveBeenCalled();
      });
      done();
    });
  });

  it('receives the id of the goal when "delete" button is clicked', (done) => {
    const spy = jest.spyOn(BucketList.methods, 'deleteGoal');
    const httpClient = MockAxios;
    const wrapper = shallowMount(BucketList, {
      propsData: { httpClient }
    });

    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#delete-btn-1').trigger('click');

        expect(spy).toHaveBeenCalledWith(1);
      });
      done();
    });
  });

  it('makes a DELETE request to the correct API endpoint with correct id to delete a goal', (done) => {
    const httpClient = MockAxios;
    const wrapper= shallowMount(BucketList, {
      propsData: { httpClient }
    });
    
    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#delete-btn-1').trigger('click');

        wrapper.vm.$nextTick(() => {
          const uri = wrapper.vm.http.httpClient.getLastURI();
          const goal = wrapper.vm.http.httpClient.getLastGoal();
          const header = wrapper.vm.http.httpClient.getLastHeader();
          expect(uri).toEqual('/api/goals/1');
          expect(goal).toEqual({'goal': { id: 1 }});
          expect(header).toEqual({'HEADERS': {'headers': {'Content-type': 'application/json'}}});
        });
      });
      done();
    });
  });

  it('rerenders current goals in the Current Goals index page when a goal is deleted', (done) => {
    const httpClient = MockAxios;
    const wrapper= shallowMount(BucketList, {
      propsData: { httpClient }
    });
    
    wrapper.vm.$nextTick(() => {
      wrapper.vm.$nextTick(async () => {
        await wrapper.vm.fetchGoals();
        wrapper.find('#delete-btn-1').trigger('click');

        await wrapper.vm.deleteGoal(1);

        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.goals).toEqual(
            { id: 2,
              activity: 'feed flamingos',
              is_achieved: false,
              location: 'Aruba' }
          );
        });
      });
      done();
    });
  });
});