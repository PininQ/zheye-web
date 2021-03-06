import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { PostProps, testPosts } from '@/datas/testData'

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
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

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

export interface GlobalDataProps {
  loading: boolean
  error: GlobalErrorProps
  token: string
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    error: { status: false },
    token: localStorage.getItem('token') || '',
    columns: [],
    posts: testPosts,
    user: {
      isLogin: false,
      nickName: '',
      column: '',
    },
  },
  mutations: {
    // login(state) {
    //   state.user = {
    //     ...state.user,
    //     isLogin: true,
    //     name: 'China DCI',
    //   }
    // },
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
    fetchCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data,
      }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
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
    fetchCurrentUser({ commit }) {
      getAndCommit(`/api/user/current`, 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit(`/api/user/login`, 'login', commit, payload)
    },
    // ????????? action ????????????????????????????????????
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      // eslint-disable-next-line no-underscore-dangle
      return state.columns.find((c) => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid)
    },
  },
})

export default store
