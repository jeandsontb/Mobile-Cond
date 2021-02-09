import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    padding: 20px;
    background-color: #f5f6fa;
  `,
  Logo: styled.Image`
    width: 250px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  `,
  Field: styled.TextInput`
    border-width: 1px;
    border-color: #ccc;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    font-size: 15px;
    padding: 10px;
    margin-bottom: 15px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863e6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 15px;
  `,
  ButtonText: styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  `,
};
