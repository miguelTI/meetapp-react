import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Logo from '~/assets/logo.png';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

import { Container, Title, List, StyledLogo } from './styles';

function Attendance({ isFocused }) {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('attendances');

    setMeetups(response.data);
  }

  async function handleCancel(meetup) {
    await api.delete(`attendances/${meetup.attendance[0].id}`);

    const attendingMeetups = meetups.filter(item => item.id !== meetup.id);

    setMeetups(attendingMeetups);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Title>
          <StyledLogo source={Logo} />
        </Title>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup data={item} attending onCancel={handleCancel} />
          )}
        />
      </Container>
    </Background>
  );
}

Attendance.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Attendance);
