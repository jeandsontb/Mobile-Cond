import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import WarningItem from '../../components/WarningItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Livro de ocorrências ',
      headerRight: () => (
        <S.AddButton onPress={() => navigation.navigate('WarningAddScreen')}>
          <Icon name="plus" size={24} color="#000" />
        </S.AddButton>
      ),
    });
    getWarnings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWarnings = async () => {
    setList([]);
    setLoading(true);
    const result = await api.getWarnings();
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
          <S.NoListText>Não há ocorrências</S.NoListText>
        </S.NoListArea>
      )}
      <S.List
        data={list}
        onRefresh={getWarnings}
        refreshing={loading}
        renderItem={({item}) => <WarningItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </S.Container>
  );
};
