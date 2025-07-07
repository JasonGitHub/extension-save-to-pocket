import { request } from '../_request/request'
import { apiAdapter } from '../adapters'

/* API CALLS - Should return promises
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export function authorize(guid, userCookies) {
  return request(
    {
      path: apiAdapter.getAuthEndpoint(),
      data: apiAdapter.formatAuthRequest(guid, userCookies),
    },
    true,
  )
}
