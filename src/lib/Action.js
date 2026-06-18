import { authClient } from "./auth-client";

const { data: session, isPending } = authClient.useSession();
const userstatus = session?.user;

export { userstatus };