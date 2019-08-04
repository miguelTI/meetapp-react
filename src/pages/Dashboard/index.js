import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Logo from '~/assets/logo.png';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

import {
  Container,
  Title,
  List,
  StyledLogo,
  DateNavigator,
  FormattedDate,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(todayDate) {
    const response = await api.get('feed', {
      params: {
        date: todayDate,
      },
    });

    const feedMeetups = response.data.map(item => ({
      attending: item.attendance.length > 0,
      ...item,
    }));

    setMeetups(feedMeetups);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups(date);
    }
  }, [isFocused, date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleAttend(meetup) {
    await api.post('attendances', {
      meetup_id: meetup.id,
    });

    setMeetups(
      meetups.map(item => ({ ...item, attending: meetup.id === item.id }))
    );
  }

  async function handleCancel(meetup) {
    await api.delete(`attendances/${meetup.attendance[0].id}`);

    setMeetups(
      meetups.map(item => ({ ...item, attending: meetup.id !== item.id }))
    );
  }

  return (
    <Background>
      <Container>
        <Title>
          <StyledLogo source={Logo} />
        </Title>
        <DateNavigator>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <FormattedDate>{dateFormatted}</FormattedDate>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#FFF" />
          </TouchableOpacity>
        </DateNavigator>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              attending={item.attending}
              onAttend={handleAttend}
              onCancel={handleCancel}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
