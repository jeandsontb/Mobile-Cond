import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import S from './style';
import api from '../../services/api';
import {useStateValue} from '../../contexts/StateContext';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cadastro',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async () => {
    if (name && email && cpf && password && passwordConfirm) {
      let result = await api.register(
        name,
        email,
        cpf,
        password,
        passwordConfirm,
      );
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

  return (
    <S.Container>
      <S.Field
        placeholder="Digite seu Nome Completo"
        value={name}
        onChangeText={(e) => setName(e)}
      />

      <S.Field
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={(e) => setCpf(e)}
      />

      <S.Field
        placeholder="Digite seu E-mail"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />

      <S.Field
        placeholder="Digite sua Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(e) => setPassword(e)}
      />

      <S.Field
        placeholder="Confirme sua Senha"
        secureTextEntry={true}
        value={passwordConfirm}
        onChangeText={(e) => setPasswordConfirm(e)}
      />

      <S.ButtonArea onPress={handleRegister}>
        <S.ButtonText>CADASTRAR-SE</S.ButtonText>
      </S.ButtonArea>
    </S.Container>
  );
};
