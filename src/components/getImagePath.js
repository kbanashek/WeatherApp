import {AppImages} from '../components/appImages';
const defaultImage = require('../assets/art_fog.png');

export const getImagePath = (imageName) => {
  const appIcon = AppImages.find((element) => element.imageTitle === imageName);
  return appIcon ? appIcon.imagePath : defaultImage;
};
