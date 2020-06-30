import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Links: 'Day',
        Week: 'week',
        Month: 'month',
        Anual: 'anual'
      },
    },
  },
};
