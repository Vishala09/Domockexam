import { Prompt } from "react-router-dom";
import PropTypes from 'prop-types';
import React from 'react'

const NavigationBlocker = (props) => {
    
    if (props.navigationBlocked) 
    {
      window.onbeforeunload = () => true
    } 
    else 
    {
      window.onbeforeunload = null
    }
    return (
      <Prompt
        when={props.navigationBlocked}
        message="Are you sure you want to close the test?"
      />
    )
  };

//   ​NavigationBlocker?.propTypes = {
//     navigationBlocked: PropTypes.bool.isRequired,
//   }

  export default NavigationBlocker;