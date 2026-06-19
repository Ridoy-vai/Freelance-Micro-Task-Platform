import React from 'react';

const FreelancerCard = ({ freelancer }) => {


    return (
        <div className="group border border-black/10 rounded-2xl bg-paper/[0.04] p-5 text-center transition-colors duration-300 hover:border-signal/40 hover:bg-paper/[0.07]">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-paper/10">
                        <img
                            src={freelancer?.avatar|| "/default-avatar.png"}
                            alt={"Freelancer Avatar"}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <h3 className="mt-4 text-base font-semibold text-paper">
                            {freelancer?.name}
                        </h3>
                        <p className="mt-1 pl-2 text-xs text-paper/50">
                            {freelancer?.completedJobs} jobs completed
                        </p>
                    </div>
                </div>
                <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10">
                    <span className="text-sm font-semibold text-paper/80">
                        {freelancer?.rating}
                    </span>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                    Hourly Rate
                </span>
                <span className="font-mono text-sm font-semibold text-signal">
                    ${freelancer?.hourlyRate}/hr
                </span>
            </div>

            <div className="mt-4 flex items-center justify-start gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                    Location
                </span>
                <span className="font-mono text-sm font-semibold text-paper/80">
                    {freelancer?.location}
                </span>
            </div>
            <div className="mt-4 flex items-center justify-start gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                    Experience
                </span>
                <span className="font-mono text-sm font-semibold text-paper/80">
                    {freelancer?.experience} years
                </span>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {freelancer?.skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-full border border-sage/30 bg-sage/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-sage"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>

    );
};

export default FreelancerCard;