import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera} from 'react-native-image-picker';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [photo, setPhoto] = useState({});
  const [description, setDescription] = useState('');
  const [where, setWhere] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Adicionar um perdido',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1280,
      },
      (response) => {
        if (!response.didCancel) {
          setPhoto(response);
        }
      },
    );
  };

  const handleSave = async () => {
    if (description !== '' && where !== '' && photo !== '') {
      const result = await api.addLostItem(photo, description, where);
      if (result.error === '') {
        setPhoto({});
        setDescription('');
        setWhere('');
        navigation.navigate('FoundAndLostScreen');
      } else {
        // eslint-disable-next-line no-alert
        alert(result.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha os campos');
    }
  };

  return (
    <S.Container>
      <S.Scroller>
        <S.PhotoArea>
          {!photo.uri && (
            <S.ButtonArea onPress={handleAddPhoto}>
              <S.ButtonText>Tirar uma foto</S.ButtonText>
            </S.ButtonArea>
          )}

          {photo.uri && (
            <>
              <S.PhotoItem souce={{uri: photo.uri}} resizeMode="cover" />
              <S.ButtonArea onPress={handleAddPhoto}>
                <S.ButtonText>Tirar outra foto</S.ButtonText>
              </S.ButtonArea>
            </>
          )}
        </S.PhotoArea>

        <S.Title>Descreva o item perdido</S.Title>
        <S.Field
          placeholder="O que você quer achar"
          value={description}
          onChangeText={(e) => setDescription(e)}
        />

        <S.Title>Onde foi encontrado?</S.Title>
        <S.Field
          placeholder="Onde você achou"
          value={where}
          onChangeText={(e) => setWhere(e)}
        />

        <S.ButtonArea onPress={handleSave}>
          <S.ButtonText>Salvar</S.ButtonText>
        </S.ButtonArea>
      </S.Scroller>
    </S.Container>
  );
};
