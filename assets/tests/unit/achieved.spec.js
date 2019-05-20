import { shallowMount } from '@vue/test-utils';
import AchievedGoals from '@/components/AchievedGoals.vue';
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
    const wrapperAchieved = shallowMount(AchievedGoals);
    const wrapperCurrent = shallowMount(BucketList);
    
    await wrapperCurrent.vm.fetchGoals();
    wrapperCurrent.find('#achieved-btn-1').trigger('click');

    wrapperCurrent.vm.$nextTick(() => {
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