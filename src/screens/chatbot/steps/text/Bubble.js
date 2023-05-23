


import * as React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const maxWidth = width * 0.6;

const Bubble = styled.View`
  background-color: ${props => props.bubbleColor};
  border-top-left-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 18 + "px" : 0 + "px";
    } else if (!isFirst && isLast) {
      return user ? 18 + "px" : 0 + "px";
    }
    return 18 + "px";
  }};
  border-top-right-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 0 + "px" : 18 + "px";
    } else if (!isFirst && isLast) {
      return user ? 0 + "px": 18 + "px";
    }
    return 18 + "px";
  }};
  border-bottom-right-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 0 + "px" : 18 + "px";
    } else if (!isFirst && isLast) {
      return 18 + "px";
    }
    return props.user ? 0 + "px" : 18 + "px";
  }};
  border-bottom-left-radius: ${(props) => {
    const { isFirst, isLast, user } = props;
    if (!isFirst && !isLast) {
      return user ? 18 + "px" : 0 + "px";
    } else if (!isFirst && isLast) {
      return 18 + "px";
    }
    return props.user ? 18 + "px" : 0 + "px";
  }};
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: ${(props) => {
    const { isFirst, showAvatar } = props;
    if (!isFirst && showAvatar) {
      return -8 + "px";
    } else if (!isFirst && !showAvatar) {
      return -8 + "px";
    }
    return 0 + "px";
  }};
  margin-right: ${(props) => {
    const { isFirst, showAvatar, user } = props;
    if (!isFirst && showAvatar) {
      return user ? 58 + "px" : 6 + "px";
    } else if (showAvatar) {
      return 0 + "px";
    }
    return 6 + "px";
  }};
  margin-bottom: 10px;
  margin-left: ${(props) => {
    const { isFirst, showAvatar, user } = props;
    if (!isFirst && showAvatar) {
      return user ? 6 + "px" : 58 + "px";
    } else if (showAvatar) {
      return 0 + "px";
    }
    return 6 + "px";
  }};
  max-width: ${(props) => {
    const { isFirst, showAvatar } = props;
    if (!isFirst && showAvatar) {
      return maxWidth + 58 + "px";
    }
    return maxWidth + "px";
  }};
  min-height: 42px;
`;

export default Bubble;