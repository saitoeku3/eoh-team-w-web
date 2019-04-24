import firebase from '~/plugins/firebase'
import { Event } from '~/types'

const db = firebase.firestore()

type State = {
  events: Event[]
}

type Getters = {
  events: (state: State) => Event[]
}

export const state = (): State => ({
  events: []
})

export const getters: Getters = {
  events: (state: State) => state.events
}

export const mutations = {
  addEvent(state: State, { event }: { event: Event }) {
    state.events.push(event)
  },
  editEvent(state: State, { event, index }: { event: Event; index: number }) {
    state.events[index] = event
  },
  setEvents(state: State, { events }: { events: Event[] }) {
    state.events = events
  }
}

export const actions = {
  async fetchEvents({ commit }) {
    const events: Event[] = []
    const snapshots = await db.collection('events').get()
    snapshots.forEach(snapshot => {
      const id = snapshot.id
      const { desc, name, image_url, wareki } = snapshot.data()
      const event: Event = { desc, id, name, imageUrl: image_url, wareki }
      events.push(event)
    })
    events.sort((a: Event, b: Event) => {
      return a.wareki - b.wareki
    })
    commit('setEvents', { events })
  }
}
