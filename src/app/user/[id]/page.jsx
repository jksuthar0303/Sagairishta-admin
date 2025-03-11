"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const UserDetails = () => {
  const router = useRouter();
  const { id } = useParams();


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/userProfile/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-xl mt-10 border border-gray-300 mb-14">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">User Details</h1>
  
    {user?.profilePic && (
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-6 shadow-md border-4 border-gray-200"
      />
    )}
  
    <div className="space-y-3 text-gray-800">
      <p><strong className="text-gray-900">Full Name:</strong> {user.fullName}</p>
      <p><strong className="text-gray-900">Father's Name:</strong> {user.fatherName}</p>
      <p><strong className="text-gray-900">Mother's Name:</strong> {user.motherName}</p>
      <p><strong className="text-gray-900">Mobile:</strong> {user.mobile}</p>
      <p><strong className="text-gray-900">Email:</strong> {user.email}</p>
      <p><strong className="text-gray-900">Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
      <p><strong className="text-gray-900">Age:</strong> {user.age}</p>
      <p><strong className="text-gray-900">Caste:</strong> {user.caste}</p>
      <p><strong className="text-gray-900">SubCaste:</strong> {user.subCaste}</p>
      <p><strong className="text-gray-900">Mother's SubCaste:</strong> {user.motherSubCaste}</p>
      <p><strong className="text-gray-900">Qualification:</strong> {user.qualification}</p>
      <p><strong className="text-gray-900">Occupation:</strong> {user.occupation}</p>
      <p><strong className="text-gray-900">Father's Occupation:</strong> {user.fatherOccupation}</p>
      <p><strong className="text-gray-900">Manglik:</strong> {user.manglik}</p>
      <p><strong className="text-gray-900">Divyang:</strong> {user.divyang}</p>
      <p><strong className="text-gray-900">Remarriage:</strong> {user.remarriage}</p>
      <p><strong className="text-gray-900">State:</strong> {user.state}</p>
      <p><strong className="text-gray-900">District:</strong> {user.district}</p>
      <p><strong className="text-gray-900">Address:</strong> {user.address}</p>
      <p><strong className="text-gray-900">Verified:</strong> {user.isVerified ? "✅ Yes" : "❌ No"}</p>
      <p><strong className="text-gray-900">Total Comments:</strong> {user.totalComments}</p>
    </div>
  
    {/* Displaying Siblings */}
    {user.siblings && (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Siblings</h2>
        <p><strong>Older Brothers - Married:</strong> {user.siblings.brothers.older.married}</p>
        <p><strong>Older Brothers - Unmarried:</strong> {user.siblings.brothers.older.unmarried}</p>
        <p><strong>Younger Brothers - Married:</strong> {user.siblings.brothers.younger.married}</p>
        <p><strong>Younger Brothers - Unmarried:</strong> {user.siblings.brothers.younger.unmarried}</p>
        <p><strong>Older Sisters - Married:</strong> {user.siblings.sisters.older.married}</p>
        <p><strong>Older Sisters - Unmarried:</strong> {user.siblings.sisters.older.unmarried}</p>
        <p><strong>Younger Sisters - Married:</strong> {user.siblings.sisters.younger.married}</p>
        <p><strong>Younger Sisters - Unmarried:</strong> {user.siblings.sisters.younger.unmarried}</p>
      </div>
    )}
  
    {/* Displaying Paternal Uncles and Aunts */}
    {user.paternalUncles && user.paternalUncles.length > 0 && (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Paternal Uncles</h2>
        {user.paternalUncles.map((uncle, index) => (
          <p key={index} className="text-gray-700">
            <strong>{uncle.name}</strong> (Spouse: {uncle.spouseName})
          </p>
        ))}
      </div>
    )}
  
    {user.paternalAunts && user.paternalAunts.length > 0 && (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Paternal Aunts</h2>
        {user.paternalAunts.map((aunt, index) => (
          <p key={index} className="text-gray-700">
            <strong>{aunt.name}</strong> (Spouse: {aunt.spouseName})
          </p>
        ))}
      </div>
    )}
  
    {/* Displaying Maternal Uncles and Aunts */}
    {user.maternalUncles && user.maternalUncles.length > 0 && (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Maternal Uncles</h2>
        {user.maternalUncles.map((uncle, index) => (
          <p key={index} className="text-gray-700">
            <strong>{uncle.name}</strong> (Spouse: {uncle.spouseName})
          </p>
        ))}
      </div>
    )}
  
    {user.maternalAunts && user.maternalAunts.length > 0 && (
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Maternal Aunts</h2>
        {user.maternalAunts.map((aunt, index) => (
          <p key={index} className="text-gray-700">
            <strong>{aunt.name}</strong> (Spouse: {aunt.spouseName})
          </p>
        ))}
      </div>
    )}
  
    <button
      onClick={() => router.back()}
      className="mt-8 cursor-pointer px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
    >
      Go Back
    </button>
  </div>
  
  );
};

export default UserDetails;
