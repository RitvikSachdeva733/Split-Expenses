export default function BillDetails({ friend }) {
  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000); 
  };
  return (
    <div className="third">
      <h3>Bill Details that should be given by {friend.name}</h3>
      <ul>
        {friend.billDetails.map((bill) => (
          <li key={generateUniqueId()}>
            You need to pay {bill.price} to {bill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}