import { combineReducers } from 'redux'
import * as types from './types'

const initialChannelState = {
  channels: [],
  error:false,
  pending:false,
  hover: null
}

const channelReducer = (state = initialChannelState, { type, payload }) => {
  switch (type) {
    case types.CHANNELS:
      return {
        channels: payload,
        pending: false,
        error: false
      }
    case types.ERROR:
      return {
        error: payload,
        pending: false
      }
    case types.PENDING:
      return {
        pending: payload,
      }
    case types.HOVER:
      return {
        hover: payload,
        pending: false,
      }
    default:
      return state
  }
}

const reducers = {
  channels: channelReducer,
}

export default combineReducers(reducers)
