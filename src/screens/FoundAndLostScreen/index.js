import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import LostItem from '../../components/LostItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [lostList, setLostList] = useState([]);
  const [recoveredList, setRecoveredList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Achados e Perdidos',
      headerRight: () => (
        <S.AddButton onPress={handleAddItem}>
          <Icon name="plus" size={24} color="#000" />
        </S.AddButton>
      ),
    });
    getFoundAndLost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFoundAndLost = async () => {
    setLostList([]);
    setRecoveredList([]);
    setLoading(true);
    const result = await api.getFoundAndLost();
    setLoading(false);
    if (result.error === '') {
      setLostList(result.lost);
      setRecoveredList(result.recovered);
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFoundAndLost();
    });
    return unsubscribe;
  }, [navigation]);

  const handleAddItem = () => {
    navigation.navigate('FoundAndLostAddScreen');
  };

  return (
    <S.Container>
      <S.Scroller>
        {loading && <S.LoadinIcon color="#8B63E7" size="large" />}

        {!loading && lostList.length === 0 && recoveredList.length === 0 && (
          <S.NoListArea>
            <S.NoListText>Não há itens perdidos/recuperados</S.NoListText>
          </S.NoListArea>
        )}

        {!loading && lostList.length > 0 && (
          <>
            <S.Title>Itens Perdidos</S.Title>
            <S.ProductScroller
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {lostList.map((item, index) => (
                <LostItem
                  key={index}
                  data={item}
                  showButton={true}
                  refreshFunction={getFoundAndLost}
                />
              ))}
            </S.ProductScroller>
          </>
        )}

        {!loading && recoveredList.length > 0 && (
          <>
            <S.Title>Itens Recuperados</S.Title>
            <S.ProductScroller
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {recoveredList.map((item, index) => (
                <LostItem key={index} data={item} showButton={false} />
              ))}
            </S.ProductScroller>
          </>
        )}
      </S.Scroller>
    </S.Container>
  );
};
