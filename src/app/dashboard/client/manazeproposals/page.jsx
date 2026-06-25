import ManageProposals from '@/Dashboardaction/clientcomponent/ManageProposals';
import { auth } from '@/lib/auth';
import { requireRole } from '@/lib/role-check-access';
import { GetPendingProposalsByClient } from '@/ServerActions/proposal';
import { headers } from 'next/headers';
import React from 'react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Manaze Proposals | TaskNest",
  description: "Track the status of all your submitted task proposals on TaskNest — view client details, budgets, submission links, and proposal status in one place.",
};

const page = async () => {
    await requireRole(["client"]);
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const userid = user.id;

    const result = await GetPendingProposalsByClient({ clientId: userid });
    const proposals = result?.proposals || [];
    console.log(proposals,"client manage proposal")

    return (
        <div>
            <ManageProposals proposals={proposals} />
        </div>
    );
};

export default page;