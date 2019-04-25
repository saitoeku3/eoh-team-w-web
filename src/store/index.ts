import firebase from '~/plugins/firebase'
import { Event } from '~/types'

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
  setEvents(state: State, { events }: { events: Event[] }) {
    state.events = events
  }
}

export const actions = {
  async fetchEvents({ commit }) {
    const events: Event[] = []
    const snapshots = await firebase
      .firestore()
      .collection('events')
      .get()
    snapshots.forEach(snapshot => {
      const { desc, name, image_url, wareki } = snapshot.data()
      const event: Event = { desc, name, imageUrl: image_url, wareki }
      events.push(event)
    })
    events.sort((a: Event, b: Event) => {
      return a.wareki - b.wareki
    })
    commit('setEvents', { events })
  }
}
