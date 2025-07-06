import { useState } from "react";
import { useAuth } from "../AuthContext";
import MealModal from "./MealModal";
import "./MealHistoryCard.css";

interface MealHistoryCardProps {
  id: number;
  meal_id: string; // meal ID used for the modal fetch
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  favorite: boolean;
  rating?: number;
}

export default function MealHistoryCard({
  id,
  meal_id,
  name,
  imageUrl,
  category,
  createdAt,
  favorite: initialFavorite,
  rating: initialRating = 0,
}: MealHistoryCardProps) {
  const { token } = useAuth();
  const [favorite, setFavorite] = useState(initialFavorite);
  const [rating, setRating] = useState(initialRating);
  const [showModal, setShowModal] = useState(false);

  async function toggleFavorite() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meal_histories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meal_history: { favourite: !favorite },
        }),
      });

      if (!res.ok) {
        alert("Failed to update favourite");
        return;
      }

      const updated = await res.json();
      setFavorite(updated.favorite);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateRating(newRating: number) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meal_histories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          meal_history: { rating: newRating },
        }),
      });

      if (!res.ok) {
        alert("Failed to update rating");
        return;
      }

      const updated = await res.json();
      setRating(updated.rating);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="meal-history-card">
      <img src={imageUrl} alt={name} className="meal-history-image" />

      <div className="meal-history-content">
        <h4>{name}</h4>
        <p className="meal-category">{category}</p>
        <p className="meal-date">{new Date(createdAt).toLocaleString()}</p>

        <div className="meal-rating">
          {Array.from({ length: 5 }).map((_, i) => {
            const star = i + 1;
            return (
              <button
                key={star}
                className={star <= rating ? "star selected" : "star"}
                onClick={() => updateRating(star)}
              >
                ★
              </button>
            );
          })}
        </div>

        <button
          className="favorite-button"
          onClick={toggleFavorite}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "⭐️ Remove favorite" : "☆ Add to favorites"}
        </button>
      </div>

      <div className="meal-history-actions">
        <button className="show-details-button" onClick={() => setShowModal(true)}>
          👁 Show Details
        </button>
      </div>

      {showModal && (
        <MealModal mealId={meal_id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
