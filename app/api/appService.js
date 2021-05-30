import fetch from './interceptor';

const appService = {};

appService.getScoreboard = function (id) {
  return fetch({
    url: `/${id}/scoreboard`,
    method: 'get',
    headers: {
      'public-request': 'true'
    }
  });
};

export default appService;
