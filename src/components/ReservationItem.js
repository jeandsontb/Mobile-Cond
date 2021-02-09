import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const Box = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 2px;
  border-color: #e8e9ed;
  border-radius: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
`;
const CoverImage = styled.Image`
  background-color: #ccc;
  height: 150px;
  border-radius: 10px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin: 10px;
`;
const DataText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #9c9db9;
  margin: 0 10px;
  text-transform: uppercase;
`;
const DateItem = styled.Text`
  font-size: 15px;
  color: #000;
  margin: 0 10px;
`;

export default ({data}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('ReservationAddScreen', {data});
  };

  return (
    <Box onPress={handleClick}>
      <CoverImage source={{uri: data.cover}} resizeMode="cover" />
      <Title>{data.title}</Title>
      <DataText>Horários de funcionamento:</DataText>
      {data.dates.map((item, index) => (
        <DateItem key={index}>{item}</DateItem>
      ))}
    </Box>
  );
};
