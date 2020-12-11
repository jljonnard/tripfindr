import { combineReducers } from 'redux'

import flights from './flights'
import fields from './fields'
import photo from './photo'
import selectedTrip from './selectedTrip'
import areDetailsOpen from './areDetailsOpen'
import setVisibilityFilter from './setVisibilityFilter'

export default combineReducers({
    flights: flights,
    fields: fields,
    filter: setVisibilityFilter,
    photo: photo,
    areDetailsOpen: areDetailsOpen,
    selectedTrip: selectedTrip,
})