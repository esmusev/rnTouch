import React, {Fragment} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Dimensions, StyleSheet, View} from 'react-native';

const Circle = () => {
  const startingPosition = 650;
  const x = useSharedValue(150);
  const y = useSharedValue(startingPosition);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const circleSize = 100;
  const rightBorder = width - circleSize;
  const bottomBorder = height - circleSize;

  const pressed = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      let currentX = ctx.startX + event.translationX;
      let currentY = ctx.startY + event.translationY;
      x.value = Math.max(0, currentX > rightBorder ? rightBorder : currentX);
      y.value = Math.max(40, currentY > bottomBorder ? bottomBorder : currentY);
    },

    onEnd: (event, ctx) => {
      pressed.value = false;
      y.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      height: circleSize,
      width: circleSize,
      backgroundColor: pressed.value ? 'red' : 'yellow',
      shadowOpacity: pressed.value ? 0.8 : 0.2,
      shadowColor: pressed.value ? 'red' : 'grey',
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
  });

  const shadow = useAnimatedStyle(() => {
    return {
      height: 10,
      width: 100,
      backgroundColor: pressed.value ? 'lightgrey' : 'none',
      borderRadius: 100,
      opacity: 0.2,

      transform: [
        {translateX: x.value},
        {translateY: startingPosition},
        {scale: withSpring(pressed.value ? 1.2 : 0)},
      ],
    };
  });

  return (
    <Fragment>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, uas]} />
      </PanGestureHandler>
      <Animated.View style={[shadow]} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    backgroundColor: 'yellow',
    borderColor: 'lightgreen',
    borderWidth: 5,
    borderRadius: 50,
    shadowColor: '#666666',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 4, y: -5},
    zIndex: 2,
  },
});

export default Circle;
