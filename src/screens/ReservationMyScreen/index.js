import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import MyReservationItem from '../../components/MyReservationItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Minhas Reservas',
    });
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getMyReservations();
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
      {!loading && list.length === 0 && (
        <S.NoListArea>
          <S.NoListText>Não há reservar.</S.NoListText>
        </S.NoListArea>
      )}
      <S.List
        data={list}
        onRefresh={getList}
        refreshing={loading}
        renderItem={({item}) => (
          <MyReservationItem data={item} refreshFunction={getList} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </S.Container>
  );
};
