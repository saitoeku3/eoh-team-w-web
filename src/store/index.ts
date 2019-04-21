import firebase from '~/plugins/firebase'

const db = firebase.firestore()

type Event = {
  id: string
  name: string
  desc: string
  imageURL: string
  wareki: number
}

type State = {
  events: Event[]
}

type Getters = {
  events: (state: State) => Event[]
}

export const state = (): State => ({
  events: [
    {
      desc: 'This is test',
      id: 'xydXJGMsarNukwrw26Pi',
      imageURL:
        'https://dol.ismcdn.jp/mwimgs/6/b/670m/img_6b201e1a7a266ad253bf473f846d695e67132.jpg',
      name: 'test event',
      wareki: 0
    }
  ]
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
      const { desc, name, imageURL, wareki } = snapshot.data()
      const event: Event = { desc, id, name, imageURL, wareki }
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
          const { id, name, desc, imageURL, wareki } = doc.data()
          const event: Event = {
            id,
            name,
            desc,
            imageURL,
            wareki
          }
          commit('editEvent', { event, index })
        }
      })
    })
  }
}
