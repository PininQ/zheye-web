import { createStore, Commit } from 'vuex'
import { ColumnProps, PostProps, testData, testPosts } from '@/datas/testData'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: true,
      name: 'China DCI',
      columnId: 1,
    },
  },
  mutations: {
    login(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'China DCI',
      }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
  },
  actions: {},
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid)
    },
  },
})

export default store
