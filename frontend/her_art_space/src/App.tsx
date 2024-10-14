// import SignUpPage from './pages/SignUpPage';

// const App = () => {

//     return (
//       <>
//         <main className="flex min-h-screen justify-center sm:items-center sm:pt-0">
//             <SignUpPage />
//         </main>
//       </>
//     );
// };

// export default App;

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}

