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
    commit('setEvents', { events })
  },
  updateEvents({ commit, state }: { commit: any; state: State }) {
    const events = state.events
    db.collection('Event').onSnapshot(spapshot => {
      spapshot.forEach(doc => {
        const index = events.findIndex((event: Event) => event.id == doc.id)
        if (index === -1) {
          return
        } else {
          const { id, name, desc, image_url, wareki } = doc.data()
          const event: Event = {
            id,
            name,
            desc,
            imageUrl: image_url,
            wareki
          }
          commit('editEvent', { event, index })
        }
      })
    })
  }
}
