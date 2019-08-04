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
  DisabledButton,
} from './styles';

export default function Meetup({
  data,
  attending,
  disabled,
  onAttend,
  onCancel,
}) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "d 'de' MMMM 'às' HH:mm", {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container>
      <Avatar
        source={{
          url: data.avatar
            ? data.avatar.url
            : 'https://imgplaceholder.com/900x300/cccccc/757575/glyphicon-picture',
        }}
      />
      <Info>
        <Name>
          {data.id} - {data.name}
        </Name>
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
        {attending || disabled || (
          <AttendButton onPress={() => onAttend(data)}>
            Realizar Inscrição
          </AttendButton>
        )}
        {attending && (
          <CancelButton onPress={() => onCancel(data)}>
            Cancelar inscrição
          </CancelButton>
        )}
        {disabled && <DisabledButton>Inscrito</DisabledButton>}
      </Info>
    </Container>
  );
}
