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
  setEvents(state: State, { events }: { events: Event[] }) {
    state.events = events
  }
}

const getImageUrl = async (fileRef: string) => {
  if (!fileRef) {
    return ''
  }
  const storageRef = firebase.storage().ref()
  const imageUrl: string = await storageRef.child(fileRef).getDownloadURL()
  return imageUrl
}

export const actions = {
  async fetchEvents({ commit }) {
    const events: Event[] = []
    const snapshots = await db.collection('events').get()
    for (const doc of snapshots.docs) {
      const { desc, name, image_url, wareki } = doc.data()
      const imageUrl = await getImageUrl(image_url)
      const event: Event = { desc, name, imageUrl, wareki, hoge: image_url }
      events.push(event)
    }
    events.sort((a: Event, b: Event) => {
      return a.wareki - b.wareki
    })
    commit('setEvents', { events })
  }
}
