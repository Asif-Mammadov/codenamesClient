import fetch from './interceptor';

const authService = {};

authService.login = function (data) {
  return fetch({
    url: '/admin/account/login',
    method: 'post',
    headers: {
      'public-request': 'true'
    },
    data: data
  });
};

authService.logout = function () {
  return fetch({
    url: '/admin/account/logout',
    method: 'put',
    headers: {
      'public-request': 'true'
    }
  });
};

export default authService;
