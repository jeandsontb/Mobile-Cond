import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import S from './style';
import api from '../../services/api';
import {useStateValue} from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handlerLoginButton = async () => {
    if (cpf && password) {
      let result = await api.login(cpf, password);
      if (result.error === '') {
        dispatch({
          type: 'setToken',
          payload: {
            token: result.token,
          },
        });

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
        alert(result.error);
      }
    } else {
      alert('Preencha os campos');
    }
  };

  const handleRegisterButton = () => {
    navigation.navigate('Register');
  };

  return (
    <S.Container>
      <S.Logo
        source={require('../../assets/undraw_home.png')}
        resizeMode="contain"
      />

      <S.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(e) => setCpf(e)}
      />

      <S.Field
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />

      <S.ButtonArea onPress={handlerLoginButton}>
        <S.ButtonText>ENTRAR</S.ButtonText>
      </S.ButtonArea>

      <S.ButtonArea onPress={handleRegisterButton}>
        <S.ButtonText>CADASTRAR-SE</S.ButtonText>
      </S.ButtonArea>
    </S.Container>
  );
};
