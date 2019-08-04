import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;

  background: #fff;
  display: flex;
  flex-direction: column;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
`;

export const Subtitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubtitleText = styled.Text`
  margin-left: 10px;
  color: #999;
  font-size: 13px;
  line-height: 24px;
`;

export const AttendButton = styled(Button)`
  margin-top: 5px;
`;

export const CancelButton = styled(Button)`
  margin-top: 5px;
  background: #d44059;
`;
