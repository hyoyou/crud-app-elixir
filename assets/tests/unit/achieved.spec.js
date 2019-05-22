import { shallowMount } from '@vue/test-utils';
import AchievedList from '@/components/AchievedList.vue';
import BucketList from '@/components/BucketList.vue';
jest.mock('axios');
import axios from 'axios';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('AchievedGoals.vue', () => {
  it('adds current goals to the Achieved Goals index page when a goal is marked as "achieved"', async (done) => {
    let promise = new Promise(function(resolve, reject) {
      resolve({
        'data': {
          'data': [
            { 
              'id': 1,
              'activity': 'swim with sharks',
              'is_achieved': true,
              'location': 'the Bahamas'
            }
          ]
        }
      });
    });
    axios.get.mockReturnValue(promise);

    const httpClient = axios;
    const wrapperHome = shallowMount(BucketList, {
      propsData: { httpClient }
    });
    const wrapperAchieved = shallowMount(AchievedList, {
      propsData: { httpClient }
    });
    
    await wrapperHome.vm.fetchGoals();
    wrapperHome.find('#achieved-btn-1').trigger('click');

    wrapperHome.vm.$nextTick(() => {
      expect(wrapperAchieved.vm.goals).toEqual([
        { id: 1,
          activity: 'swim with sharks',
          is_achieved: true,
          location: 'the Bahamas' }
      ]);
      done();
    });
  });
});