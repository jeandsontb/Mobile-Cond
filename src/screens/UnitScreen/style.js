import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 15px;
  `,
  LoadinIcon: styled.ActivityIndicator``,
  TitleArea: styled.View`
    flex-direction: row;
    padding: 10px;
  `,
  Title: styled.Text`
    font-size: 17px;
    color: #000;
    flex: 1;
  `,
  TitleAddButton: styled.TouchableOpacity`
    width: 30px;
    height: 30px;
  `,
  ListArea: styled.View`
    margin-bottom: 20px;
  `,
  ModalArea: styled.Modal``,
  ModalBg: styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
  `,
  ModalBody: styled.ScrollView`
    background-color: #fff;
    margin: 20px;
  `,
};
