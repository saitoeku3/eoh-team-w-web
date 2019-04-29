import firebase from '~/plugins/firebase'
import { Event, Stamp } from '~/types'

type State = {
  events: Event[]
  stamps: Stamp[]
}

type Getters = {
  events: (state: State) => Event[]
  stamps: (state: State) => Stamp[]
}

type Mutations = {
  setEvents: (state: State, payload: { events: Event[] }) => void
  setStamp: (state: State, payload: { stamp: Stamp }) => void
}

export const state = (): State => ({
  events: [],
  stamps: []
})

export const getters: Getters = {
  events: (state: State) => state.events,
  stamps: (state: State) => state.stamps
}

export const mutations: Mutations = {
  setEvents(state, { events }) {
    state.events = events
  },
  setStamp(state, { stamp }) {
    state.stamps.push(stamp)
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
  // async fetchStamp({ commit, state }: { commit: any; state: State }) {
  //   firebase
  //     .firestore()
  //     .collection('stamps')
  //     .onSnapshot(querySnapshot => {
  //       querySnapshot.docs.forEach(doc => {
  //         const id = doc.id
  //         const { content, has_displayed } = doc.data()
  //         const stamp: Stamp = {
  //           content,
  //           hasDisplayed: has_displayed,
  //           id
  //         }
  //         const isIncludes = state.stamps.some(s => s.id === id)
  //         if (!isIncludes) {
  //           commit('setStamp', { stamp })
  //         }
  //       })
  //     })
  // }
}
