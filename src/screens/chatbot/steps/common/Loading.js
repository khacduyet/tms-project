import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
// import { Bubbles } from 'react-native-loader';

const Loading = (props) => {
  const { custom, color } = props;
  let style = { paddingTop: 6 };
  const styles = StyleSheet.create({
    innerText: {
      fontWeight: 'bold',
      color: color,
    },
  });
  if (custom) {
    style = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };
  }

  return (
    <View style={style}>
      {/* <Bubbles
        size={3}
        color={color}
      /> */}
      <Text style={styles.innerText}>
        ...
      </Text>
    </View>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  custom: PropTypes.bool,
};

Loading.defaultProps = {
  custom: false,
};

export default Loading;
