import React, {useState} from 'react';
import styled from 'styled-components/native';

import api from '../services/api';

const Box = styled.View`
  padding: 20px;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Label = styled.Text`
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
`;
const Field = styled.TextInput`
  background-color: #fff;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  color: #000;
  font-size: 15px;
  padding: 10px;
  margin-bottom: 15px;
`;
const ButtonArea = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
`;
const SaveButton = styled.Button`
  flex: 1;
`;
const CancelButton = styled.Button`
  flex: 1;
`;

export default ({refreshFunction, setShowModal}) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');

  const handleAdd = async () => {
    if (title && color && plate) {
      const result = await api.addUnitItem('vehicle', {
        title,
        color,
        plate,
      });

      if (result.error === '') {
        refreshFunction();
        setShowModal(false);
      } else {
        // eslint-disable-next-line no-alert
        alert(result.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha os campos');
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Box>
      <Title>Adicionar novo veículo</Title>

      <Label>Nome Completo:</Label>
      <Field
        placeholder="Digite o nome do veículo"
        value={title}
        onChangeText={(e) => setTitle(e)}
      />

      <Label>Cor:</Label>
      <Field
        placeholder="Digite a cor do veículo"
        value={color}
        onChangeText={(e) => setColor(e)}
      />

      <Label>Placa:</Label>
      <Field
        placeholder="Digite a placa do veículo"
        value={plate}
        onChangeText={(e) => setPlate(e)}
      />

      <ButtonArea>
        <SaveButton title="Adicionar" onPress={handleAdd} />
        <CancelButton color="#FF0000" title="Cancelar" onPress={handleCancel} />
      </ButtonArea>
    </Box>
  );
};
