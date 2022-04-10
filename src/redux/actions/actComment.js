import * as actComment from '../constants'

export const actInsertComment = (comment) =>({
  type: actComment.INSERT_COMMENT_SAGA,
  payload: comment
})
export const actDeleteComment = (id,taskId) =>({
  type: actComment.DELETE_COMMENT_SAGA,
  payload: id,
  taskId
})

export const actUpdateComment = (updateComment,taskId) =>({
  type: actComment.UPDATE_COMMENT_SAGA,
  payload: updateComment,
  taskId
})