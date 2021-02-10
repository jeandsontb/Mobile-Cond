import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
  `,
  LoadinIcon: styled.ActivityIndicator``,
  NoListArea: styled.View`
    justify-content: center;
    align-items: center;
    padding: 30px;
  `,
  NoListText: styled.Text`
    font-size: 15px;
    color: #000;
  `,
  Title: styled.Text`
    font-size: 17px;
    color: #000;
    margin: 10px 20px;
  `,
  ProductScroller: styled.ScrollView`
    width: 100%;
    padding-left: 20px;
    margin-bottom: 20px;
  `,
  AddButton: styled.TouchableOpacity`
    margin-right: 15px;
  `,
};
