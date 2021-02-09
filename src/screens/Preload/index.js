import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import S from './style';
import api from '../../services/api';
import {useStateValue} from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  useEffect(() => {
    const checkLogin = async () => {
      let token = await api.getToken();

      if (token) {
        let result = await api.validateToken();
        if (result.error === '') {
          dispatch({
            type: 'setUser',
            payload: {
              user: result.user,
            },
          });
          navigation.reset({
            index: 1,
            routes: [{name: 'ChooseProperty'}],
          });
        } else {
          // eslint-disable-next-line no-alert
          alert(result.error);
          dispatch({type: 'setToken', payload: {token: ''}});
          navigation.reset({
            index: 1,
            routes: [{name: 'Login'}],
          });
        }
      } else {
        navigation.reset({
          index: 1,
          routes: [{name: 'Login'}],
        });
      }
    };

    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.LoadingIcon color="#8863E6" size="large" />
    </S.Container>
  );
};
