import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}${endpoint}`;
  let body = null;

  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
      break;
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params);
      break;
  }

  let headers = {'Content-Type': 'application/json'};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let req = await fetch(fullUrl, {method, headers, body});
  let json = await req.json();
  return json;
};

export default {
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },

  validateToken: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('post', '/auth/validate', {}, token);
    return json;
  },
  login: async (cpf, password) => {
    let json = await request('post', '/auth/login', {cpf, password});
    return json;
  },
  logout: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('post', '/auth/logout', {}, token);

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('property');

    return json;
  },
  register: async (name, email, cpf, password, password_confirm) => {
    let json = await request('post', '/auth/register', {
      name,
      email,
      cpf,
      password,
      password_confirm,
    });
    return json;
  },
  getWall: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('get', '/walls', {}, token);
    return json;
  },
  likeWallPost: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('post', `/wall/${id}/like`, {}, token);
    return json;
  },
  getDocs: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('get', '/docs', {}, token);
    return json;
  },
  getBillets: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let json = await request('get', '/billets', {property: property.id}, token);
    return json;
  },
  getWarnings: async () => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let json = await request(
      'get',
      '/warnings',
      {property: property.id},
      token,
    );
    return json;
  },
  addWarningFile: async (file) => {
    let token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('photo', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    let req = await fetch(`${baseUrl}/warning/file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    let json = await req.json();
    return json;
  },
  addWarning: async (title, list) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let json = await request(
      'post',
      '/warning',
      {
        title,
        list,
        property: property.id,
      },
      token,
    );
    return json;
  },
  getReservations: async () => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('get', '/reservations', {}, token);
    return json;
  },
  getDisableDates: async (id) => {
    let token = await AsyncStorage.getItem('token');
    let json = await request(
      'get',
      `/reservation/${id}/disableddates`,
      {},
      token,
    );
    return json;
  },
  getReservationsTimes: async (id, date) => {
    let token = await AsyncStorage.getItem('token');
    let json = await request('get', `/reservation/${id}/times`, {date}, token);
    return json;
  },
  setReservation: async (id, date, time) => {
    let token = await AsyncStorage.getItem('token');
    let property = await AsyncStorage.getItem('property');
    property = JSON.parse(property);
    let json = await request(
      'post',
      `/reservation/${id}`,
      {
        property: property.id,
        date,
        time,
      },
      token,
    );
    return json;
  },
};
