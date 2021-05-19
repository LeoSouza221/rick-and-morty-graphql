import ListItems from '../../src/components/ListItems.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
import {createLocalVue, mount} from '@vue/test-utils';

describe('ListItems.vue', () => {
  let localVue;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();
    wrapper = mount(ListItems, {
      localVue,
      vuetify,
      propsData: {
        listName: 'Test Title',
        results: [
          {
            text: 'A',
            number: 2,
          },
        ],
        pageCount: 1,
        keys: [],
      },
      slots: {
        'info-cards': `<div class="card-slot">Card Slot</div>`
      }
    })
  });

  it('should match with the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match title', () => {
    const title = wrapper.find('.title');

    expect(title.text()).toBe('Test Title');
  });

  it('should find slot', () => {
    const cardSlot = wrapper.find('.card-slot');

    expect(cardSlot.text()).toBe('Card Slot');
  });

  it('should pagination match with number of prop page count', async () => {
    let paginationItems = wrapper.findAll('button.v-pagination__item');
    const newPage = 2;

    expect(paginationItems.length).toBe(wrapper.vm.pageCount);

    await wrapper.setProps({ pageCount: newPage })

    paginationItems = wrapper.findAll('button.v-pagination__item');

    expect(paginationItems.length).toBe(newPage);
  });

  it('should pagination emit event when change', async () => {
    const event = jest.fn()
    const newPage = 2;

    wrapper.vm.$on('newSearch', event)
    await wrapper.setProps({ pageCount: newPage })

    const paginationItems = wrapper.findAll('button.v-pagination__item');

    expect(event).toHaveBeenCalledTimes(0)
    expect(paginationItems.length).toBe(newPage);

    const pageTwo = paginationItems.at(1)
    pageTwo.trigger('click')

    expect(event).toHaveBeenCalledTimes(1)
  });

  it('should return ordered array', async () => {
    const resultsArray = [
      {
        number: 2,
      },
      {
        number: 1,
      },
    ];
    const sortBy = 'number';

    await wrapper.setData({ sortBy });
    await wrapper.setProps({ results: resultsArray });

    const [itemOne, itemTwo] = wrapper.vm.orderedResults
    expect(itemOne.number).toBe(1);
    expect(itemTwo.number).toBe(2);
  });

  it('should emit event when type more then 3 words in input', async () => {
    jest.useFakeTimers()
    const event = jest.fn()
    const textInput = wrapper.find('.search-input input[type="text"]')

    wrapper.vm.$on('newSearch', event)
    await textInput.setValue('som')

    expect(wrapper.vm.searchValue).toBe('som')
    expect(event).toHaveBeenCalledTimes(0)

    await textInput.setValue('some value')

    await Vue.nextTick()
    
    jest.advanceTimersByTime(1000);
    expect(event).toHaveBeenCalledTimes(1);
  });
});
