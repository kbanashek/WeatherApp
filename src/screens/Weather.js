import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {getImagePath} from '../components/getImagePath';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {locations} from '../constants/locations';

const Weather = ({showDetail}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState([]);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${locations[0].locationName}&units=imperial&APPID=43196f6e47d88215fc41633b74239b9e`,
        );

        setCurrentWeather(await response.json());
      } catch (e) {
        console.log('fetchCurrentWeather err:', e);
      }
    };

    const fetchForeCastWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?${locations[0].locationCords}&units=imperial&exclude=minutely,hourly,current&appid=43196f6e47d88215fc41633b74239b9e`,
        );

        setForecastWeather(await response.json());
      } catch (e) {
        console.log('fetchForeCastWeather:', e);
      }
    };

    fetchCurrentWeather();
    fetchForeCastWeather();

    //setForecastWeather(weather);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderCurrentWeather = (currentWeather, getImagePath) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.weatherDetails}>
          <View style={{width: 150, height: 50}}>
            <Text style={styles.sectionDescription}>
              Today, {monthNames[new Date().getMonth()]} {new Date().getDate()}
            </Text>
          </View>
          <View style={{width: 150, height: 80, alignItems: 'center'}}>
            <Text style={styles.currentFareheightTempText}>
              {currentWeather.main && Math.round(currentWeather.main.temp)}
              {'\xB0'}
            </Text>
          </View>
          <View style={{width: 150, height: 50, alignItems: 'center'}}>
            <Text style={styles.currentCelsiusTempText}>
              {currentWeather.main && Math.round(currentWeather.main.temp_min)}
              {'\xB0'}
            </Text>
          </View>
        </View>

        <View style={styles.weatherDetailsRight}>
          <View style={{width: 150, height: 150}}>
            {currentWeather.weather && (
              <Image
                style={styles.appImage}
                source={getImagePath(currentWeather.weather[0].icon)}
              />
            )}
          </View>
          <View style={{width: 150, height: 50}}>
            <Text style={styles.currentConditionsText}>
              {currentWeather.weather[0].description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderWeatherForecast = (forecastWeather, showDetail, getImagePath) => {
    const getDayName = (dayOfWeek) => {
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      return dayOfWeek === 0 ? 'Tomorrow' : daysOfWeek[dayOfWeek];
    };

    const setDayOfWeek = (day, index) => {
      day.renderDate = getDayName(index);
    };

    return (
      <View style={styles.dailyList}>
        <ScrollView>
          {forecastWeather.daily &&
            forecastWeather.daily.slice(0, 5).map((day, index) => {
              setDayOfWeek(day, index);
              return (
                <TouchableOpacity onPress={() => showDetail(day)} key={day.dt}>
                  <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                    <View
                      style={{
                        width: 70,
                        height: 50,
                      }}>
                      <Image
                        style={styles.appImageSmall}
                        source={getImagePath(day.weather[0].icon)}
                      />
                    </View>
                    <View
                      style={{
                        width: 200,
                        height: 50,
                        alignItems: 'flex-start',
                      }}>
                      <Text>{day.renderDate}</Text>
                      <Text>
                        {day.weather[0] && day.weather[0].description}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: '600', fontSize: 16}}>
                        {day.temp && Math.round(day.temp.max)}
                        {'\xB0'}
                      </Text>
                      <Text>
                        {day.temp && Math.round(day.temp.min)}
                        {'\xB0'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          {currentWeather &&
            currentWeather.weather &&
            renderCurrentWeather(currentWeather, getImagePath)}
          {forecastWeather &&
            renderWeatherForecast(forecastWeather, showDetail, getImagePath)}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'royalblue',
    height: '100%',
    flexGrow: 1,
  },
  dailyList: {
    backgroundColor: '#efefef',
    height: '100%',
    flexGrow: 1,
  },
  weatherDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  weatherDetailsRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  body: {
    backgroundColor: 'skyblue',
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
    marginRight: 30,
    flex: 1,
    flexDirection: 'row',
  },
  currentFareheightTempText: {
    marginTop: 2,
    fontSize: 58,
    fontWeight: '400',
    color: Colors.white,
    alignItems: 'center',
  },
  currentCelsiusTempText: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  highlight: {
    fontWeight: '700',
  },
  currentConditionsText: {
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  appImage: {
    width: 150,
    height: 150,
  },
  appImageSmall: {
    width: 40,
    height: 40,
  },
});

export default Weather;
