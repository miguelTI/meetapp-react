import React, { useMemo } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Avatar,
  Info,
  Name,
  Subtitle,
  SubtitleText,
  AttendButton,
  CancelButton,
} from './styles';

export default function Meetup({ data, attending, onAttend, onCancel }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "d 'de' MMMM", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container>
      <Avatar source={{ url: data.avatar.url }} />
      <Info>
        <Name>{data.name}</Name>
        <Subtitle>
          <Icon name="event" size={14} color="#999" />
          <SubtitleText>{dateParsed}</SubtitleText>
        </Subtitle>
        <Subtitle>
          <Icon name="place" size={14} color="#999" />
          <SubtitleText>{data.locale}</SubtitleText>
        </Subtitle>
        <Subtitle>
          <Icon name="person" size={14} color="#999" />
          <SubtitleText>Organizador: {data.user.name}</SubtitleText>
        </Subtitle>
        {attending || (
          <AttendButton onPress={() => onAttend(data)}>
            Realizar Inscrição
          </AttendButton>
        )}
        {attending && (
          <CancelButton onPress={() => onCancel(data)}>
            Cancelar inscrição
          </CancelButton>
        )}
      </Info>
    </Container>
  );
}
