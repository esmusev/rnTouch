import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import Circle from './Circle';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const boxSize = 100;

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  pan.setValue({
    x: width / 2 - boxSize / 2,
    y: height / 2 - boxSize / 2,
  });

  const panHandler = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: pan.x.interpolate({
                inputRange: [0, width - boxSize],
                outputRange: [0, width - boxSize],
                extrapolate: 'clamp',
              }),
            },
            {
              translateY: pan.y.interpolate({
                inputRange: [0, height - boxSize],
                outputRange: [0, height - boxSize * 1.5],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
        {...panHandler.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
      <Circle />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  box: {
    position: 'absolute',
    height: boxSize,
    width: boxSize,
    backgroundColor: 'blue',
    borderColor: 'lightblue',
    borderWidth: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 4, y: -5},
  },
});

export default App;
