import postApi from './api/postApi';
import { initPagination, initSearch, renderPagination, renderPostList } from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location);
    if (filterName) url.searchParams.set(filterName, filterValue);

    // reset page if needed
    if (filterName === 'title_like') {
      url.searchParams.set('_page', '1');
    }
    history.pushState({}, '', url);

    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('failed to fetch post list', error);
  }
}

function registerPostDeleteEvent() {
  document.addEventListener('post-delete', async (e) => {
    try {
      const post = e.detail;
      console.log('dispatch remove', post);
      await postApi.remove(post.id);
      await handleFilterChange();

      toast.success('Remove post successfully');
    } catch (error) {
      console.log('failed to remove post', error);
      toast.error(error.message);
    }
  });
}

(async () => {
  try {
    const url = new URL(window.location);

    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
    const queryParams = url.searchParams;

    registerPostDeleteEvent();

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => {
        handleFilterChange('_page', page);
      },
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (page) => {
        handleFilterChange('title_like', page);
      },
    });

    handleFilterChange();
  } catch (error) {
    console.log('get all failed', error);
  }
})();
