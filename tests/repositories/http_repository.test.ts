import { expect, GoodClient, BadClient } from '../main.test'

import HTTPRepository from '../../lib/repositories/http_repository'

describe('With a Good Client', () => {
  it('Retrieves the index when API returns one result', async () => {
    let httpClient = new GoodClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.Query({url: "/good_stuff", cursor: "After-Cursor"})
    expect(result.data).to.have.deep.members([ { name: 'stuff', id: 123 }, { name: 'other_stuff', id: 345 } ])
  })
  it('Retrieves an item', async () => {
    let httpClient = new GoodClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.ReadResource({url: "/good_stuff", id: 123})
    expect(result.data).to.eql({name: "stuff", id: 123})
  })
  it('Retrieves an with ID on URL', async () => {
    let httpClient = new GoodClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.ReadResource({url: "/good_stuff/123"})
    expect(result.data).to.eql({name: "stuff", id: 123})
  })
  it('Writes an item', async () => {
    let httpClient = new GoodClient({id: 123})
    let repo = new HTTPRepository(httpClient)
    let result = await repo.WriteResource({url: "/good_stuff", data: {name: "stuff"}})
    expect(result.data).to.eql({id: 123})
  })
  it('Updates an item', async () => {
    let httpClient = new GoodClient({id: 123, name: "updated_stuff"})
    let repo = new HTTPRepository(httpClient)
    let result = await repo.WriteResource({url: "/good_stuff", data: {id: 123, name: "updated_stuff"}})
    expect(result.data).to.eql({name: "updated_stuff", id: 123})
  })
  it('Destroys an item', async () => {
    let httpClient = new GoodClient(null)
    let repo = new HTTPRepository(httpClient)
    let result = await repo.DestroyResource({url: "/good_stuff", data: {id: 123}})
    expect(result.data).to.eql({})
  })
})

describe('When the API Client is broken', () => {
  it('Retrieves the index', async () => {
    let httpClient = new BadClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.Query({url: "/good_stuff"})
    expect(result.data).to.equal(undefined)
    expect(result).to.eql({ error: 'There was a problem retrieving all the results: uh oh!' })
  })
  it('Retrieves an item', async () => {
    let httpClient = new BadClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.ReadResource({url: "/good_stuff", id: 123})
    expect(result.data).to.equal(undefined)
    expect(result).to.eql({ error: 'There was a problem reading the resource: uh oh!' })
  })
  it('Writes an item', async () => {
    let httpClient = new BadClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.WriteResource({url: "/good_stuff", data: {name: "stuff"}})
    expect(result.data).to.equal(undefined)
    expect(result).to.eql({ error: 'There was a problem writing the resource: uh oh!' })
  })
  it('Updates an item', async () => {
    let httpClient = new BadClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.WriteResource({url: "/good_stuff", data: {id: 123, name: "updated_stuff"}})
    expect(result.data).to.equal(undefined)
    expect(result).to.eql({ error: 'There was a problem writing the resource: uh oh!' })
  })
  it('Destroys an item', async () => {
    let httpClient = new BadClient()
    let repo = new HTTPRepository(httpClient)
    let result = await repo.DestroyResource({url: "/good_stuff", data: {id: 123}})
    expect(result.data).to.equal(undefined)
    expect(result).to.eql({ error: 'There was a problem destroying the resource: uh oh!' })
  })
})
