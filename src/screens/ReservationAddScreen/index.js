import React, {useState, useEffect, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';

import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';
import styled from 'styled-components';
import {max} from 'moment';

export default () => {
  const scroll = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [disableDates, setDisableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        headerTitle: `Reservar ${route.params.data.title}`,
      });
      getDisableDates();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route]);

  useEffect(() => {
    getTimes();
  }, [selectedDate]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const getDisableDates = async () => {
    setDisableDates([]);
    setTimeList([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setLoading(true);

    const result = await api.getDisableDates(route.params.data.id);
    setLoading(false);
    if (result.error === '') {
      let dateList = [];
      for (let i in result.list) {
        dateList.push(new Date(result.list[i]));
      }

      setDisableDates(dateList);
    } else {
      alert(result.error);
    }
  };

  const handleDateChange = (date) => {
    let dateEl = new Date(date);
    let year = dateEl.getFullYear();
    let month = dateEl.getMonth() + 1;
    let day = dateEl.getDay();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    setSelectedDate(`${year}-${month}-${day}`);
  };

  const showTextDate = (date) => {
    let dateEl = new Date(date);
    let year = dateEl.getFullYear();
    let month = dateEl.getMonth() + 1;
    let day = dateEl.getDay();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    return `${day}/${month}/${year}`;
  };

  const getTimes = async () => {
    if (selectedDate) {
      const result = await api.getReservationsTimes(
        route.params.data.id,
        selectedDate,
      );
      if (result.error === '') {
        setSelectedTime(null);
        setTimeList(result.list);
        setTimeout(() => {
          scroll.current.scrollToEnd();
        }, 500);
      } else {
        // eslint-disable-next-line no-alert
        alert(result.error);
      }
    }
  };

  const handleSave = async () => {
    if (selectedDate && selectedTime) {
      const result = await api.setReservation(
        route.params.data.id,
        selectedDate,
        selectedTime,
      );
      if (result.error === '') {
        navigation.navigate('ReservationMyScreen');
      } else {
        // eslint-disable-next-line no-alert
        alert(result.error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Selecione uma data e horário');
    }
  };

  return (
    <S.Container>
      <S.Scroller ref={scroll} contentContainerStyle={{paddingBottom: 40}}>
        <S.CoverImage
          source={{uri: route.params.data.cover}}
          resizeMode="cover"
        />

        {loading && <S.LoadinIcon size="large" color="#8863E6" />}

        {!loading && (
          <S.CalendarArea>
            <CalendarPicker
              onDateChange={handleDateChange}
              disabledDates={disableDates}
              minDate={minDate}
              maxDate={maxDate}
              weekdays={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
              previousTitle="Anterior"
              nextTitle="Próximo"
              selectedDayColor="#8863E6"
              selectedDayTextColor="#FFFFFF"
              todayBackgroundColor="transparent"
              todayTextStyle="000000"
            />
          </S.CalendarArea>
        )}

        {!loading && selectedDate && (
          <>
            <S.Title>
              Horários disponíveis em {showTextDate(selectedDate)}:
            </S.Title>

            <S.TimeListArea>
              {timeList.map((item, index) => (
                <S.TimeItem
                  key={index}
                  onPress={() => setSelectedTime(item.id)}
                  active={selectedTime === item.id}>
                  <S.TimeItemText active={selectedTime === item.id}>
                    {item.title}
                  </S.TimeItemText>
                </S.TimeItem>
              ))}
            </S.TimeListArea>
          </>
        )}
      </S.Scroller>
      {!loading && (
        <S.ButtonArea onPress={handleSave}>
          <S.ButtonText>Reservar Local</S.ButtonText>
        </S.ButtonArea>
      )}
    </S.Container>
  );
};
