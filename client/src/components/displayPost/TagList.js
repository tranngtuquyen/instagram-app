import React, { Fragment } from 'react'
import TagItem from './TagItem';

function TagList(props) {
  const {tags} = props;
  let content;
  if (tags.length > 0) {
    content = tags.map(tag => <TagItem tag={tag}/>)
  }
  return (
    <Fragment>
      {content}
    </Fragment>
  )
}

export default TagList;
