import { request } from '../_request/request'
import { apiAdapter } from '../adapters'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function removeItem(itemId) {
  return request({
    path: apiAdapter.getSaveEndpoint(),
    data: apiAdapter.formatRemoveRequest(itemId)
  }).then(response => {
    return response
      ? { status: 'ok', response: response.action_results?.[0] || response }
      : undefined
  })
}
