import { request } from '../_request/request'
import { apiAdapter } from '../adapters'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function saveToPocket(saveObject) {
  return request({
    path: apiAdapter.getSaveEndpoint(),
    data: apiAdapter.formatSaveRequest(saveObject)
  }).then(response => {
    return apiAdapter.formatSaveResponse(response, saveObject)
  })
}
