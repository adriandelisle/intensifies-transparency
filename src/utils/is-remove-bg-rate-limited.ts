import { RemoveBg } from '../constants/'

export const isRemoveBgRateLimited: () => Promise<boolean> = async () => {
  try {
    const response = await fetch(RemoveBg.apiUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': RemoveBg.apiKey,
      },
    })

    if (!response.ok) {
      return true
    }

    const data = await response.json()

    /*
    Api response data
    {
      data: {
        attributes: {
          credits: {
            total: 200,
            subscription: 150,
            payg: 50,
            enterprise: 0,
          },
          api: {
            free_calls: 50,
            sizes: 'all',
          },
        },
      },
    }
    */
    return Boolean(data?.attributes?.api?.free_calls)
  } catch (error) {
    // on any network error just play it safe an say we're rate limited
    return false
  }
}
