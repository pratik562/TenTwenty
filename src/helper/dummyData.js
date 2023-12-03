import { icons } from "../constants";

export const TabData = [
    {
      name: 'Dashboard',
      label: 'Dashboard',
      icon: icons.dots, // Replace with your dashboard icon source
    },
    {
      name: 'Watch',
      label: 'Watch',
      icon: icons.play, // Replace with your watch icon source
    },
    {
      name: 'MediaLibrary',
      label: 'Media Library',
      icon: icons.media, // Replace with your media library icon source
    },
    {
      name: 'More',
      label: 'More',
      icon: icons.list, // Replace with your more icon source
    },
  ];

  export const cinemaHalls = [
    { id: 1, name: 'Cinetech + hall 1' ,hall:require('../../assets/images/MapMobile.png'), time: '12:00', price: '$50',bonus:'2500 Bounus' },
    { id: 2, name: 'Cinetech + hall 2' ,hall:require('../../assets/images/MapMobile.png'),time: '14:00', price: '$75',bonus:'3000 Bounus' },
    { id: 3, name: 'Cinetech + hall 3' ,hall:require('../../assets/images/MapMobile.png'), time: '16:00', price: '$100',bonus:'3500 Bounus'},
    { id: 4, name: 'Cinetech + hall 4' ,hall:require('../../assets/images/MapMobile.png'),time: '21:00', price: '$125',bonus:'4000 Bounus'},
    
  ];
