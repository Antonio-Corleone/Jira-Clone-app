import * as actComment from '../constants'

export const actInsertComment = (comment) =>({
  type: actComment.INSERT_COMMENT_SAGA,
  payload: comment
})
