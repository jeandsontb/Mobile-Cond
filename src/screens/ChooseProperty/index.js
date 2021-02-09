import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPropertySel = async () => {
      let property = await AsyncStorage.getItem('property');
      if (property) {
        property = JSON.parse(property);
        await chooseProperty(property);
      }

      setLoading(false);
    };
    checkPropertySel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoutButton = async () => {
    await api.logout();

    navigation.reset({
      index: 1,
      routes: [{name: 'Login'}],
    });
  };

  const chooseProperty = async (property) => {
    await AsyncStorage.setItem('property', JSON.stringify(property));

    dispatch({
      type: 'setProperty',
      payload: {
        property,
      },
    });

    navigation.reset({
      index: 1,
      routes: [{name: 'MainDrawer'}],
    });
  };

  return (
    <S.Container>
      <S.Scroller>
        {loading && <S.LoadinIcon color="#8863E6" size="large" />}
        {!loading && context.user.user.properties.length > 0 && (
          <>
            <S.HeadTitle>Olá {context.user.user.name}</S.HeadTitle>
            <S.HeadTitle>Esclha a lista de suas propriedades</S.HeadTitle>

            <S.PropertyList>
              {context.user.user.properties.map((item, index) => (
                <S.ButtonArea key={index} onPress={() => chooseProperty(item)}>
                  <S.ButtonText> {item.name} </S.ButtonText>
                </S.ButtonArea>
              ))}
            </S.PropertyList>
          </>
        )}
        {!loading && context.user.user.properties.length <= 0 && (
          <S.BigArea>
            <S.HeadTitle>
              {context.user.user.name}, parabéns pelo cadastro!
            </S.HeadTitle>
            <S.HeadTitle>
              Agora a administração precisa liberar o seu acesso.
            </S.HeadTitle>
          </S.BigArea>
        )}
      </S.Scroller>

      <S.ExitButtonArea onPress={handleLogoutButton}>
        <S.ExitButtonText>SAIR</S.ExitButtonText>
      </S.ExitButtonArea>
    </S.Container>
  );
};
