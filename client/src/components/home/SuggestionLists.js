import React, { Component } from 'react'
import SuggestionItem from './SuggestionItem';

class SuggestionLists extends Component {
  
  render() {
    const {profiles} = this.props;
    let suggestions;
    if (profiles) {
      suggestions = profiles.map(profile => (
        <SuggestionItem profile={profile}/>
      ));
    }
    
    return (
      <div>
        {suggestions}
      </div>
    )
  }
}


export default SuggestionLists;