import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const useDidMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

type StylishProgressBarProps = {
  max: number;
  min: number;
  inactive?: string;
  active?: string;
  height?: number;
  borderRadius?: number;
  animationDuration?: number;
};

const StylishProgressBar = ({
  max,
  min,
  inactive = '#e3f2fd',
  active = '#2196f3',
  height = 10,
  borderRadius = 5,
  animationDuration = 800,
}: StylishProgressBarProps) => {
  const anim = useRef(new Animated.Value(0)).current;
  const anim1 = useRef(new Animated.Value(0)).current;
  const didMount = useDidMount();

  useEffect(() => {
    if (!didMount) {
      return;
    }

    if (min > max || min < 0) {
      console.warn('Invalid value: ', min);
      return;
    }

    Animated.sequence([
      Animated.timing(anim, {
        toValue: min,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(anim1, {
        toValue: 10,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(anim1, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [min]);

  const progressInterpolator = anim.interpolate({
    inputRange: [0, max],
    outputRange: ['0%', '100%'],
  });

  return (
    <View>
      <View style={{ height, borderRadius, backgroundColor: inactive }}>
        <Animated.View
          style={[
            styles.active,
            {
              borderRadius,
              height,
              width: progressInterpolator,
              backgroundColor: active,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.spark,
              {
                top: -13,
                backgroundColor: active,
                height: anim1,
                transform: [
                  {
                    rotate: '45deg',
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.spark,
              {
                backgroundColor: active,
                height: anim1,
                transform: [{ rotate: '92deg' }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.spark,
              {
                top: 13,
                backgroundColor: active,
                height: anim1,
                transform: [{ rotate: '-50deg' }],
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  active: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  spark: {
    position: 'absolute',
    right: -10,
    width: 3,
    borderRadius: 1.5,
  },
});

export default StylishProgressBar;
