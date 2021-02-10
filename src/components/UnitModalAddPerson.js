import React, {useState} from 'react';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';

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
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  const handleAdd = async () => {
    if (name && date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      let formattedDate = `${year}-${month}-${day}`;

      const result = await api.addUnitItem('person', {
        name: name,
        birthdate: formattedDate,
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
      <Title>Adicionar um novo morador</Title>

      <Label>Nome Completo:</Label>
      <Field
        placeholder="Digite o nome completo"
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <Label>Data de nascimento:</Label>
      <DatePicker
        mode="date"
        date={date}
        onDateChange={setDate}
        locale="pt-BR"
      />

      <ButtonArea>
        <SaveButton title="Adicionar" onPress={handleAdd} />
        <CancelButton color="#FF0000" title="Cancelar" onPress={handleCancel} />
      </ButtonArea>
    </Box>
  );
};
