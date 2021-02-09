import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import DocItem from '../../components/DocItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Boletos',
    });
    getBillets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBillets = async () => {
    setDocList([]);
    setLoading(true);
    const result = await api.getBillets();
    setLoading(false);
    if (result.error === '') {
      setDocList(result.list);
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  return (
    <S.Container>
      {!loading && docList.length === 0 && (
        <S.NoListArea>
          <S.NoListText>Não há boletos desta unidade</S.NoListText>
        </S.NoListArea>
      )}
      <S.List
        data={docList}
        onRefresh={getBillets}
        refreshing={loading}
        renderItem={({item}) => <DocItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </S.Container>
  );
};
