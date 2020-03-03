import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator, Image, Dimensions
} from 'react-native';

import CustomScrollView from './CustomScrollView';

var deviceWidth = Dimensions.get('window').width;

export default class App extends Component {
  constructor() {
    super();
    this.state = { dataLoaded: false, viewsHolder: [] }
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/0.8/?results=5").then(
      (response) => response.json()).then(
        (responseData) => {
          responseData.results.map((item, key) => {
            this.state.viewsHolder.push
              (
                <View key={key} style={[styles.childContainer, { width: deviceWidth }]}>
                  <Image source={{ uri: item.user.picture.large }}
                    style={{ width: 250, height: 250, borderRadius: 250 / 2 }} />
                  <Text style={styles.setTextLayout}>{item.user.name.first}</Text>
                </View>
              );
          })
          this.setState({ dataLoaded: true, viewsHolder: this.state.viewsHolder });
        });
  }

  render() {
    if (this.state.dataLoaded)
      return (
        <CustomScrollView>
          {
            this.state.viewsHolder
          }
        </CustomScrollView>
      );
    else {
      return (
        <View style={styles.activityIndicatorHolder}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create(
  {

    childContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    setTextLayout: {
      fontSize: 35,
      color: 'white'
    },

    activityIndicatorHolder: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });