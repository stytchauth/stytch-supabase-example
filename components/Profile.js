// components/Profile.js
import React from "react";
import Link from "next/link";

export default function Profile({ user }) {
  return (
    <div>
      <h1>Welcome {user.userId}</h1>
      <h2>Your expenses</h2>
      {user.expenses?.length > 0 ? (
        user.expenses.map((expense) => (
          <p key={expense.id}>
            {expense.title}: ${expense.value}
          </p>
        ))
      ) : (
        <p>You have no expenses!</p>
      )}

      <Link href="/api/logout" passHref>
        <button>
          <a>Logout</a>
        </button>
      </Link>
    </div>
  );
}
