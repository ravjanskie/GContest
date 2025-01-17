import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/AuthStore'

//Landing Page
import LandingPage from '@/views/LandingPage.vue'

//Auth
const LoginView = () => import('@/views/Auth/LoginView.vue')
const RegisterView = () => import('@/views/Auth/RegisterView.vue')

//Dashboard
const HomeDashboard = () => import('@/views/Dashboard/HomeDashboard.vue')

//Creator
const CreateQuiz = () => import('@/views/Quiz/Creator/CreateQuiz.vue')
const EditQuestion = () => import('@/views/Quiz/Creator/EditQuestion.vue')
const BlankQuestion = () => import('@/views/Quiz/Creator/BlankQuestion.vue')
const UpdateQuiz = () => import('@/views/Quiz/Creator/UpdateQuiz.vue')
const CreatorLobby = () => import('@/views/Quiz/Creator/CreatorLobby.vue')

const Playground = () => import('@/views/Quiz/PlaygroundView.vue')

//Joiner
// const LobbyView = ()=> import('@/views/Quiz/Joiner/LobbyView.vue');
const QuizView = () => import('@/views/Quiz/Joiner/QuizView.vue')
const Lobby = () => import('@/views/Quiz/Joiner/Lobby.vue')

//Redirectors
const PathNotFound = () => import('@/views/PathNotFound.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/testPlayground',
      name: 'testPlayground',
      component: Playground
    },

    //Landing Page
    {
      path: '/LandingPage',
      name: 'LandingPage',
      component: LandingPage
    },

    //Authentication
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },

    //Dashboard
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: HomeDashboard
    },

    //Creator
    {
      path: '/creator/quiz/create',
      name: 'create-quiz',
      component: CreateQuiz
    },
    {
      path: '/creator/quiz/create/:quiz_id/blank',
      name: 'blank-question',
      component: BlankQuestion
    },
    {
      path: '/creator/quiz/:quiz_id/:question_id/edit',
      name: 'edit-question',
      component: EditQuestion
    },
    {
      path: '/creator/quiz/:quiz_id/update',
      name: 'update-quiz',
      component: UpdateQuiz
    },
    {
      path: '/creator/quiz/:room_number/lobby',
      name: 'creator-lobby',
      component: CreatorLobby
    },

    //Joiners
    {
      path: '/join/quiz/:room_number/start',
      name: 'quiz-join',
      component: QuizView
    },
    {
      path: '/join/quiz/:room_number/lobby',
      name: 'quiz-lobby',
      component: Lobby
    },

    //Redirections
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PathNotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()

  if (
    to.name !== 'login' &&
    to.name !== 'register' &&
    to.name !== 'LandingPage' &&
    !store.isAuthenticated
  ) {
    next({ name: 'login' })
  } else if (store.isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'dashboard' })
  } else next()
})

export default router
