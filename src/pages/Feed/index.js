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

function Feed({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(
    todayDate,
    currentPage = 1,
    currentMeetups = null
  ) {
    const response = await api.get('feed', {
      params: {
        date: todayDate,
        page: currentPage,
      },
    });

    const feedMeetups = response.data.map(item => ({
      attending: item.attendance.length > 0,
      ...item,
    }));

    setMeetups(
      currentMeetups ? [...currentMeetups, ...feedMeetups] : feedMeetups
    );
  }

  useEffect(() => {
    if (isFocused) {
      setPage(1);
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
      meetups.map(item =>
        meetup.id === item.id ? { ...item, attending: true } : item
      )
    );
  }

  async function handlePageChange() {
    loadMeetups(date, page + 1, meetups);
    await setPage(page + 1);
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
              disabled={item.attending}
              onAttend={handleAttend}
            />
          )}
          onEndReachedThreshold={0}
          onEndReached={handlePageChange}
        />
      </Container>
    </Background>
  );
}

Feed.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Feed);
