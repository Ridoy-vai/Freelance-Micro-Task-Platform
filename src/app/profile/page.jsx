"use client";

import Image from "next/image";

export default function ProfilePage() {
  // demo user data (later DB/API থেকে আনবে)
  const user = {
    name: "Md Sahariyar Ridoy",
    email: "ridoy@example.com",
    photo:
      "https://i.ibb.co/4pDNDk1/avatar.png",
    skills: ["React", "Node.js", "Next.js", "UI/UX"],
    bio: "I am a full-stack developer focused on building modern web applications.",
    rate: 20,
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Profile Image */}
          <div className="w-28 h-28 relative">
            <Image
              src={user.photo}
              alt="Profile"
              fill
              className="rounded-full object-cover border"
            />
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-500">{user.email}</p>

            <p className="mt-2 text-sm text-gray-600">
              💰 Hourly Rate:{" "}
              <span className="font-bold text-green-600">
                ${user.rate}/hr
              </span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Bio</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-8">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}