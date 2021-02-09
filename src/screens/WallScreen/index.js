import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import WallItem from '../../components/WallItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [wallList, setWallList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mural de avisos',
    });
    getWall();
  }, []);

  const getWall = async () => {
    setWallList([]);
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === '') {
      setWallList(result.list);
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  return (
    <S.Container>
      {!loading && wallList.length === 0 && (
        <S.NoListArea>
          <S.NoListText>Não há avisos.</S.NoListText>
        </S.NoListArea>
      )}
      <S.List
        data={wallList}
        onRefresh={getWall}
        refreshing={loading}
        renderItem={({item}) => <WallItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </S.Container>
  );
};
