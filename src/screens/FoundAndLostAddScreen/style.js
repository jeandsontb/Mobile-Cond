import styled from 'styled-components/native';

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
    padding: 15px;
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
  List: styled.FlatList`
    flex: 1;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 15px;
  `,
  PhotoArea: styled.View``,
  Title: styled.Text`
    font-size: 17px;
    color: #000;
    margin: 10px 0;
  `,
  PhotoItem: styled.Image`
    height: 200px;
    border-radius: 5px;
    margin-bottom: 10px;
  `,
  Field: styled.TextInput`
    background-color: #fff;
    border-width: 1px;
    border-color: #ccc;
    padding: 10px;
    color: #000;
    margin-bottom: 15px;
    font-size: 15px;
    border-radius: 5px;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #8863e6;
    padding: 12px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  `,
  ButtonText: styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 15px;
  `,
};
