import { useState } from "react";
import { useAuth } from "../AuthContext";
import MealModal from "./MealModal";
import "./MealHistoryCard.css";
import StarRating from "./StarRating";


interface MealHistoryCardProps {
  id: number;
  meal_id: string;
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
      <div className="meal-history-image-wrapper">
        <img src={imageUrl} alt={name} className="meal-history-image" />
      </div>
  
      <div className="meal-history-info">
        <div className="meal-history-category">{category}</div>
        <h4>{name}</h4>
        <p className="meal-date">{new Date(createdAt).toLocaleString()}</p>
  
        <div className="meal-history-meta">
          <StarRating rating={rating} onRate={updateRating} />
        </div>
      </div>
      <div className="meal-history-actions">
        <button
          className="favorite-button"
          onClick={toggleFavorite}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "♥" : "♡"}
        </button>
        <button className="details-button" onClick={() => setShowModal(true)}>
          Show Details
        </button>
      </div>

      {showModal && (
        <MealModal mealId={meal_id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
