import { getAuth, clerkClient } from '@clerk/tanstack-react-start/server';
import { createClient } from '@supabase/supabase-js';

// export function supabaseServerClient() {
//   return createServerClient(
//     process.env.SUPABASE_API_URL as string,
//     process.env.SUPABASE_API_KEY as string,
//     {
//       cookies: {
//         getAll() {
//           return Object.entries(parseCookies()).map(([name, value]) => ({
//             name,
//             value,
//           }));
//         },
//         setAll(cookies) {
//           cookies.forEach((cookie) => {
//             setCookie(cookie.name, cookie.value);
//           });
//         },
//       },
//     },
//   );
// }
