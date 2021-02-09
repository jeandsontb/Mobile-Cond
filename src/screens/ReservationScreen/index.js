import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import ReservationItem from '../../components/ReservationItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Reservas disponíveis',
    });
    getReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getReservations = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getReservations();
    setLoading(false);
    if (result.error === '') {
      setList(result.list);
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  return (
    <S.Container>
      <S.Scroller contentContainerStyle={{paddingBottom: 40}}>
        <S.ButtonArea onPress={null}>
          <S.ButtonText>Minhas Reservas</S.ButtonText>
        </S.ButtonArea>

        <S.Title>Selecione uma Área</S.Title>

        {loading && <S.LoadinIcon size="large" color="#8863E6" />}

        {loading === false && list.length === 0 && (
          <S.NolistArea>
            <S.NoListText>Não há áreas disponíveis.</S.NoListText>
          </S.NolistArea>
        )}

        {list.map((item, index) => (
          <ReservationItem key={index} data={item} />
        ))}
      </S.Scroller>
    </S.Container>
  );
};
