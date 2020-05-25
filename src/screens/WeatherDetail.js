import React, {useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getImagePath} from '../components/getImagePath';

const WeatherDetail = ({selectedDayWeatherReport, showWeather}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
              {currentWeather.renderDate}
            </Text>
          </View>
          <View style={{width: 150, height: 80, alignItems: 'center'}}>
            <Text style={styles.currentFareheightTempText}>
              {Math.round(currentWeather.temp.day)}
              {'\xB0'}
            </Text>
          </View>
          <View style={{width: 150, height: 50, alignItems: 'center'}}>
            <Text style={styles.currentCelsiusTempText}>
              {Math.round(currentWeather.temp.min)}
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

  const getWindDirection = (windDegree) => {
    const derivedWindDirection = Math.floor(windDegree / 22.5 + 0.5);
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return directions[derivedWindDirection % 16];
  };

  return (
    <SafeAreaView>
      <View
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => showWeather('test')}>
            <Text style={styles.buttonText}> &lt; Back</Text>
          </TouchableOpacity>

          {selectedDayWeatherReport.weather &&
            renderCurrentWeather(
              selectedDayWeatherReport.weather,
              getImagePath,
            )}

          <View style={{flex: 1, flexDirection: 'column', paddingTop: 100}}>
            <View style={styles.currentDayDetails}>
              <Text style={styles.sectionDescription}>
                Humidity:{' '}
                {selectedDayWeatherReport.weather &&
                  selectedDayWeatherReport.weather.humidity}{' '}
                %
              </Text>
            </View>
            <View style={styles.currentDayDetails}>
              <Text style={styles.sectionDescription}>
                Pressure:{' '}
                {selectedDayWeatherReport.weather &&
                  selectedDayWeatherReport.weather.pressure}{' '}
                hPa
              </Text>
            </View>
            <View style={styles.currentDayDetails}>
              <Text style={styles.sectionDescription}>
                Wind:{' '}
                {selectedDayWeatherReport.weather &&
                  selectedDayWeatherReport.weather.wind_speed}{' '}
                km/h NW{' '}
                {getWindDirection(selectedDayWeatherReport.weather.wind_deg)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#efefef',
    height: '100%',
    flexGrow: 1,
  },
  currentDayDetails: {
    width: 250,
    height: 50,
    alignItems: 'flex-start',
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
  backButton: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 152,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.black,
    marginLeft: 30,
    flex: 1,
    flexDirection: 'row',
  },
  currentFareheightTempText: {
    marginTop: 2,
    fontSize: 58,
    fontWeight: '400',
    color: Colors.black,
    alignItems: 'center',
  },
  currentCelsiusTempText: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
  },
  highlight: {
    fontWeight: '700',
  },
  currentConditionsText: {
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.black,
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

export default WeatherDetail;
