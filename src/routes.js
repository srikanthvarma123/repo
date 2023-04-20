// import React from 'react'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/dashboard', name: 'Dashboard', component: Dashboard },
// ]

// export default routes


import React from 'react'
const Response = React.lazy(() => import('./views/response/Response'))
const Exception = React.lazy(() => import('./views/exception/Exception'))
const Requests = React.lazy(() => import('./views/requests/Requests'))
const Details = React.lazy(() => import('./views/details/Details'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/response', name: 'Response', component: Response, exact: true },
  { path: '/exception', name: 'Exception', component: Exception, exact: true },
  { path: '/request', name: 'Request', component: Requests, exact: true },
  { path: '/details', name: 'Details', component: Details, exact: true },
]

export default routes
