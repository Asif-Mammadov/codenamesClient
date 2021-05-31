import fetch from './interceptor';

const authService = {};

authService.login = function (data) {
  return fetch({
    url: '/login',
    method: 'post',
    headers: {
      'public-request': 'true'
    },
    data
  });
};

authService.register = function (data) {
  return fetch({
    url: '/register',
    method: 'post',
    headers: {
      'public-request': 'true'
    },
    data
  });
};

authService.getDetails = function (id) {
  return fetch({
    url: `/${id}/details`,
    method: 'get',
    headers: {
      'public-request': 'true'
    }
  });
};

authService.resetPassword = function (id, data) {
  return fetch({
    url: `/${id}/password`,
    method: 'put',
    headers: {
      'public-request': 'true'
    },
    data
  });
};

authService.updateDetails = function (id, data) {
  return fetch({
    url: `/${id}/details`,
    method: 'put',
    headers: {
      'public-request': 'true'
    },
    data
  });
};

authService.getScoreboard = function (id) {
  return fetch({
    url: `/${id}/scoreboard`,
    method: 'get',
    headers: {
      'public-request': 'true'
    }
  });
};

export default authService;
