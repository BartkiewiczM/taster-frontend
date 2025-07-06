// src/components/MealModal.tsx
import { useEffect, useState } from "react";
import "./MealModal.css";
import { useAuth } from "../AuthContext";

interface Meal {
  id: number;
  name: string;
  category: string;
  recipe: string;
  ingredients: string[];
  image_url: string;
  external_api_id: string;
}

interface MealModalProps {
  mealId: string;
  onClose: () => void;
}

export default function MealModal({ mealId, onClose }: MealModalProps) {
  const { token } = useAuth();
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/meals/${mealId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          alert("Failed to load meal");
          onClose();
          return;
        }

        const data = await res.json();
        setMeal(data);
      } catch (err) {
        console.error(err);
        onClose();
      }
    }

    fetchMeal();
  }, [mealId]);

  return (
    <div className="modal-backdrop">
      <div className="meal-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        {meal ? (
          <div>
            <h2>{meal.name}</h2>
            <img src={meal.image_url} alt={meal.name} />
            <h4>Category: {meal.category}</h4>
            <h4>Ingredients:</h4>
            <ul>
              {meal.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>
            <h4>Recipe:</h4>
            <p>{meal.recipe}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
