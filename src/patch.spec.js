import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Kitsu from 'kitsu'
import {
  patchSingle,
  patchSingleMissingID
} from './__cases__'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('patch', () => {
  it('should throw an error if Authorization header is not set (patch)', async () => {
    expect.assertions(1)
    const api = new Kitsu()
    mock.onPatch().reply(200)
    // expect(api.patch('posts', patchSingle.kitsu)).rejects.toThrow('Not logged in')
    expect(api.patch('posts', patchSingle.kitsu)).rejects.toThrowError('Not logged in')
  })

  it('should throw an error if ID is missing (patch)', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch().reply(200)
    expect(api.patch('posts', patchSingleMissingID.kitsu)).rejects.toThrowError('Updating a resource requires an ID')
  })

  it('Should update a single resource', async () => {
    expect.assertions(1)
    const api = new Kitsu({ headers: { Authorization: true } })
    mock.onPatch(`posts/${patchSingle.jsonapi.data.id}`).reply(200, patchSingle.jsonapi)
    const request = await api.patch('posts', patchSingle.kitsu)
    expect(request).toEqual(patchSingle.jsonapi)
  })
})
