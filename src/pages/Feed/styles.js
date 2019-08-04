import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.View`
  align-self: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 34px;
`;

export const StyledLogo = styled.Image`
  width: 24px;
  height: 24px;
`;

export const Meetup = styled.View``;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const DateNavigator = styled.View`
  flex-direction: row;
  align-self: center;
  align-items: center;
  padding-bottom: 10px;
`;

export const FormattedDate = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 0 16px;
`;
