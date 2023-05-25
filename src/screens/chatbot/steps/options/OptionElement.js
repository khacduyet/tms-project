import styled from 'styled-components/native';

const OptionElement = styled.View`
  background-color: ${props => props.bubbleColor};
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
  borderBottomLeftRadius: 20px;
  borderBottomRightRadius: 20px;
`;

export default OptionElement;