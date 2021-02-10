import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import UnitPeapleSection from '../../components/UnitPeapleSection';
import UnitVehicleSection from '../../components/UnitVehicleSection';
import UnitPetSection from '../../components/UnitPetSection';
import UnitModalAddPerson from '../../components/UnitModalAddPerson';
import UnitModalAddVehicle from '../../components/UnitModalAddVehicle';
import UnitModalAddPet from '../../components/UnitModalAddPet';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [petList, setPetList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Dados da unidade (${context.user.property.name})`,
    });
    getUnitInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUnitInfo = async () => {
    setLoading(true);
    const result = await api.getUnitInfo();
    setLoading(false);
    if (result.error === '') {
      setPeopleList(result.peoples);
      setVehicleList(result.vehicles);
      setPetList(result.pets);
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  const handleAdd = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <S.Container>
      <S.Scroller>
        {loading && <S.LoadinIcon color="#8B63E7" size="large" />}
        {!loading && (
          <>
            <S.TitleArea>
              <S.Title>Moradores</S.Title>
              <S.TitleAddButton onPress={() => handleAdd('person')}>
                <Icon name="plus" size={24} color="#000" />
              </S.TitleAddButton>
            </S.TitleArea>
            <S.ListArea>
              <UnitPeapleSection
                list={peopleList}
                refreshFunction={getUnitInfo}
              />
            </S.ListArea>

            <S.TitleArea>
              <S.Title>Veículos</S.Title>
              <S.TitleAddButton onPress={() => handleAdd('vehicle')}>
                <Icon name="plus" size={24} color="#000" />
              </S.TitleAddButton>
            </S.TitleArea>
            <UnitVehicleSection
              list={vehicleList}
              refreshFunction={getUnitInfo}
            />
            <S.ListArea />

            <S.TitleArea>
              <S.Title>Pets</S.Title>
              <S.TitleAddButton onPress={() => handleAdd('pet')}>
                <Icon name="plus" size={24} color="#000" />
              </S.TitleAddButton>
            </S.TitleArea>
            <UnitPetSection list={petList} refreshFunction={getUnitInfo} />
            <S.ListArea />
          </>
        )}
      </S.Scroller>

      <S.ModalArea visible={showModal} transparent={true} animationType="slide">
        <S.ModalBg>
          <S.ModalBody>
            {modalType === 'person' && (
              <UnitModalAddPerson
                refreshFunction={getUnitInfo}
                setShowModal={setShowModal}
              />
            )}

            {modalType === 'vehicle' && (
              <UnitModalAddVehicle
                refreshFunction={getUnitInfo}
                setShowModal={setShowModal}
              />
            )}

            {modalType === 'pet' && (
              <UnitModalAddPet
                refreshFunction={getUnitInfo}
                setShowModal={setShowModal}
              />
            )}
          </S.ModalBody>
        </S.ModalBg>
      </S.ModalArea>
    </S.Container>
  );
};
