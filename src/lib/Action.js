export const { data: session, isPending } = authClient.useSession();
export const isuser = () => {
    const user = session?.user;
    return !!user;
};
export const user = session?.user;