import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from "../../firebaseConfig"
import Card from "./Card";

const Dashboard = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const obj={
  id:1,
  name:'abc',
  count:setCount(),
}

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user data in local storage.");
      setLoading(false);
      return;
    }

    const usernameL = storedUser.username;

    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("username", "==", usernameL));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No data found for user:", usernameL);
          setError(`No data found for user: ${usernameL}`);
        } else {
          const userDetails = [];
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("Fetched user data:", userData); // Debugging line
            userDetails.push(userData);
          });

          setDetails(userDetails); // Update the details state with the fetched data
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (details.length === 0) {
    return <div>No financial data available.</div>;
  }

  return (
    <div className="main">
      {details.map((financialData, index) => {
        // Calculate totalOwe and totalDebt
        const totalOwe = financialData.debts
          .filter((debt) => debt.amount < 0)
          .reduce((total, debt) => total + Math.abs(debt.amount), 0);

        const totalDebt = financialData.debts
          .filter((debt) => debt.amount > 0)
          .reduce((total, debt) => total + debt.amount, 0);

        return (
          <React.Fragment key={index}>
            <h1>Welcome, {financialData.username}</h1>
            <Card
              title="Personal Money"
              content={
                <>
                  <div>
                    Personal Money: ${financialData.personalMoney.toFixed(2)}
                  </div>
                  <div>Total Owe: ${totalOwe.toFixed(2)}</div>
                  <div>Total Debt: ${totalDebt.toFixed(2)}</div>
                </>
              }
            />
            <h2>Debts</h2>
            {financialData.debts.length > 0 ? (
              financialData.debts.map((debt, debtIndex) => (
                <Card
                  key={debtIndex}
                  title={
                    debt.amount > 0
                      ? `${debt.name} owes you`
                      : `You owe ${debt.name}`
                  }
                  content={`$${Math.abs(debt.amount).toFixed(2)}`}
                />
              ))
            ) : (
              <div>No debts available.</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Dashboard;