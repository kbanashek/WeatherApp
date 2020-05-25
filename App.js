import React, {useState} from 'react';
import {View} from 'react-native';

import Weather from './src/screens/Weather';
import WeatherDetail from './src/screens/WeatherDetail';

function App() {
  const [selectedDayWeather, setSelectedDayWeather] = useState({});
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);

  const toggleWeatherDetail = (weatherReport) => {
    setSelectedDayWeather({weather: weatherReport});
    setShowWeatherDetail(true);
  };

  const toggleWeather = () => {
    setShowWeatherDetail(false);
  };

  return (
    <View>
      {!showWeatherDetail && <Weather showDetail={toggleWeatherDetail} />}
      {showWeatherDetail && (
        <WeatherDetail
          showWeather={toggleWeather}
          selectedDayWeatherReport={selectedDayWeather}
        />
      )}
    </View>
  );
}

export default App;
