import React from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';

const Box = styled.View``;
const Item = styled.View`
  background-color: #fff;
  border-width: 1px;
  border-color: #e8e9ed;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const InfoArea = styled.View`
  flex: 1;
`;
const StrongText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
const RegularText = styled.Text`
  font-size: 14px;
  color: #9c9db9;
`;
const RemoveButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

export default ({list, refreshFunction}) => {
  const handleRemove = (id) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir este pet?', [
      {text: 'Sim', onPress: () => removeItem(id)},
      {text: 'Cancelar', onPress: null, style: 'cancel'},
      ,
    ]);
  };

  const removeItem = async (index) => {
    let result = await api.removeUnitItem('pet', list[index].id);
    if (result.error === '') {
      refreshFunction();
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error);
    }
  };

  return (
    <Box>
      {list.map((item, index) => (
        <Item key={index}>
          <InfoArea>
            <StrongText>{item.name}</StrongText>
            <RegularText>Raça: {item.race}</RegularText>
          </InfoArea>
          <RemoveButton onPress={() => handleRemove(index)}>
            <Icon name="remove" color="#FF0000" size={24} />
          </RemoveButton>
        </Item>
      ))}
    </Box>
  );
};
