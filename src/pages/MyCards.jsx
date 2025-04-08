import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const MyCards = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          "https://authorization-service-4b7m.onrender.com/auth/cards?userId=acc-54321"
        );
        setCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching card details", error);
        setError("Failed to fetch card details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, []);

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    const firstSix = cardNumber.substring(0, 6);
    const lastFour = cardNumber.slice(-4);
    return `${firstSix} **** **** ${lastFour}`;
  };

  const handleDeleteCard = async (cardId) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.delete(
        `https://authorization-service-4b7m.onrender.com/auth/cards?cardId=${cardId}`
      );

      if (response.data.success) {
        setSuccessMessage("Card deleted successfully.");
        setCardDetails((prevDetails) =>
          prevDetails.filter((card) => card.id !== cardId)
        );
      } else {
        setError("Error deleting card.");
      }
    } catch (err) {
      console.error("Error deleting card", err);
      setError("Failed to delete the card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-bold text-center mb-4">My Cards</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-sm mt-3">{successMessage}</p>
          )}

          {cardDetails && cardDetails.length > 0 ? (
            cardDetails.map((card, index) => (
              <div
                key={index}
                className={`p-4 mb-4 border rounded-lg ${
                  card.is_default ? "border-blue-500" : "border-gray-300"
                } hover:bg-gray-100 transition-all`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8"
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="Card"
                    />
                    <span className="text-sm font-semibold">
                      {formatCardNumber(card.mask)}
                    </span>
                  </div>
                  {card.is_default && (
                    <span className="text-green-600 text-sm">✔️ Default</span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <p>Expiry Date: {card.expiryDate}</p>
                  {card.expiryDate &&
                    new Date(card.expiryDate) < new Date() && (
                      <p className="text-red-600">⚠️ Expired</p>
                    )}
                </div>

                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full transition-all duration-300"
                >
                  <FaTrashAlt className="text-white" />
                  Delete Card
                </button>
              </div>
            ))
          ) : (
            <p>No linked cards.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyCards;
