import { getAuth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const fetchUserId = createServerFn({ method: "GET" }).handler(
  async () => {
    const { userId, getToken } = await getAuth(getWebRequest()!);

    return { userId };
  },
);

export const authStateFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);

  if (!userId) {
    throw redirect({ to: "/" });
  }

  return { userId };
});
