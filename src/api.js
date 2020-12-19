const baseUrl = '/api';

export default {
  token: {
    create: `${baseUrl}/user_token`
  },
  user: {
    base: `${baseUrl}/user`
  },
  permission: {
    base: `${baseUrl}/permission`
  }
}