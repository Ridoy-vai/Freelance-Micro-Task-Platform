import ManageProposals from '@/Dashboardaction/clientcomponent/ManageProposals';
import { auth } from '@/lib/auth';
import { GetPendingProposalsByClient } from '@/ServerActions/proposal';
import { headers } from 'next/headers';
import React from 'react';

const page = async () => {
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