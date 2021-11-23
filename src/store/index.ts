import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { PostProps, testPosts } from '@/datas/testData'

export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}

export interface GlobalDataProps {
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
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
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    },
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit(`/api/columns`, 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      // eslint-disable-next-line no-underscore-dangle
      return state.columns.find((c) => c._id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid)
    },
  },
})

export default store
