import { configureStore } from '@reduxjs/toolkit'
import placeMarkSlice from './slices/placeMarkSlice'
import placeSlice from './slices/places/placeSlice'
import postMarkSlice from './slices/postMarkSlice'
import reviewSlice  from './slices/reviews/reviewSlice'
import todosSlice from './slices/todosSlice'
import postSlice from './slices/posts/postSlice'
import commentSlice from './slices/comments/commentSlice'

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    placeMarks: placeMarkSlice,
    places: placeSlice,
    posts: postSlice,
    reviews: reviewSlice,
    postMarks: postMarkSlice,
    comments:commentSlice


  }
})