import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  // component: () => (
  //   <>
  //     <div className="p-2 flex gap-2">
  //       <Link to="/" className="[&.active]:font-bold">
  //         Home
  //       </Link>{' '}
  //       <Link to="/signup" className="[&.active]:font-bold">
  //         Signup
  //       </Link>
  //       <Link to="/login" className="[&.active]:font-bold">
  //         Login
  //       </Link>
  //     </div>
  //     <hr />
  //     <Outlet />
  //     <TanStackRouterDevtools />
  //   </>
  // ),
})

// export const Route = createRootRouteWithContext<{
//   auth: Auth
// }>()({
//   component: RootComponent,
// })

// function RootComponent() {
//   return (
//     <>
//       <div className={`min-h-screen flex flex-col`}>
//         <div className={`flex-1 flex`}>
//           <div className={`divide-y w-56`}>
//             {(
//               [
//                 ['/', 'SignUpPage'],
//                 ['/login', 'LoginPage'],
//                 // ['/profile', 'Profile'],
//                 // ['/dashboard', 'Dashboard'],
//               ] as const
//             ).map(([to, label]) => {
//               return (
//                 <div key={to}>
//                   <Link
//                     to={to}
//                     activeOptions={
//                       {
//                         // If the route points to the root of it's parent,
//                         // make sure it's only active if it's exact
//                         // exact: to === '.',
//                       }
//                     }
//                     preload="intent"
//                     className={`block py-2 px-3 text-blue-700`}
//                     // Make "active" links bold
//                     activeProps={{ className: `font-bold` }}
//                   >
//                     {label}
//                   </Link>
//                 </div>
//               )
//             })}
//           </div>
//           <div className={`flex-1 border-l`}>
//             {/* Render our first route match */}
//             <Outlet />
//           </div>
//         </div>
//       </div>
//       <TanStackRouterDevtools position="bottom-right" />
//     </>
//   )
// }
