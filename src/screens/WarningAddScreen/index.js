import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera} from 'react-native-image-picker';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [warningText, setWarningText] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Adicionar ocorrência',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPhoto = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1280,
      },
      async (response) => {
        if (!response.didCancel) {
          setLoading(true);
          let result = await api.addWarningFile(response);
          setLoading(false);
          if (result.error === '') {
            let list = [...photoList];
            list.push(result.photo);
            setPhotoList(list);
          } else {
            // eslint-disable-next-line no-alert
            alert(result.error);
          }
        }
      },
    );
  };

  const handleDellPhoto = (url) => {
    let list = [...photoList];
    list = list.filter((value) => value !== url);
    setPhotoList(list);
  };

  const handleSaveWarning = async () => {
    if (warningText != '') {
      const result = await api.addWarning(warningText, photoList);
      if (result.error === '') {
        navigation.navigate('WarningScreen');
      } else {
        // eslint-disable-next-line no-alert
        alert(result.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Descreva a ocorrência');
    }
  };

  return (
    <S.Container>
      <S.Scroller>
        <S.Title>Descreva a ocorrência</S.Title>
        <S.Field
          placeholder="Qual o problema?"
          value={warningText}
          onChangeText={(e) => setWarningText(e)}
        />
        <S.Title>Fotos Relacionadas</S.Title>
        <S.PhotoArea>
          <S.PhotoScroll horizontal={true}>
            <S.PhotoAddButton onPress={handleAddPhoto}>
              <Icon name="camera" size={24} color="#000" />
            </S.PhotoAddButton>
            {photoList.map((item, index) => (
              <S.PhotoItem key={index}>
                <S.Photo source={{uri: item}} />
                <S.PhotoRemoveButton onPress={() => handleDellPhoto(item)}>
                  <Icon name="remove" size={16} color="#FF0000" />
                </S.PhotoRemoveButton>
              </S.PhotoItem>
            ))}
          </S.PhotoScroll>
        </S.PhotoArea>

        {loading && <S.LoadingText>Enviando foto...</S.LoadingText>}

        <S.ButtonArea onPress={handleSaveWarning}>
          <S.ButtonText>Salvar</S.ButtonText>
        </S.ButtonArea>
      </S.Scroller>
    </S.Container>
  );
};
