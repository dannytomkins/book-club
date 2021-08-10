// Need to create a store to use redux, boilerplate needs function createStore
// Since we are using thunk, include applyMiddleware
import { createStore, applyMiddleware} from 'redux'
// Need to use browser dev tools
import { composeWithDevTools } from 'redux-devtools-extension'
// thunk
import thunk from 'redux-thunk'
// we will have multiple reducers for profile, auth, etc
import rootReducer from './reducers'

// create an initialState
const initialState = {}

// create a middleware variable
const middleware = [thunk]

// put everything together in store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store