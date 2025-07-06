import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import MealHistoryCard from "../components/MealHistoryCard";
import "./RandomMealPage.css";

interface Meal {
  id: string;
  name: string;
  description: string;
  image_url: string;
  ingredients: string[];
  recipe: string;
}

interface MealHistory {
  id: number;
  meal_id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  created_at: string;
  favorite: boolean;
  rating?: number;
}

export default function RandomMealPage() {
  const { token } = useAuth();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [mealHistories, setMealHistories] = useState<MealHistory[]>([]);

  async function getRandomMeal() {
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meals/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to fetch meal");
        return;
      }

      const data = await res.json();
      setMeal(data);
    } catch (err) {
      console.error("Error fetching meal:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function getMealHistories() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/meal_histories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setMealHistories(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMealHistories();
  }, []);

  return (
    <div className="random-meal-page">
      <div className="random-meal">
        <h2>Random Meal</h2>
        <button onClick={getRandomMeal} disabled={loading}>
          {loading ? "Loading..." : "Get Random Meal"}
        </button>

        {meal && (
          <div className="meal-details">
            <h3>{meal.name}</h3>
            <img src={meal.image_url} alt={meal.name} />
            <p>{meal.description}</p>

            <h4>Ingredients:</h4>
            <ul>
              {meal.ingredients.map((ing) => (
                <li key={ing}>{ing}</li>
              ))}
            </ul>

            <h4>Recipe:</h4>
            <p>{meal.recipe}</p>
          </div>
        )}
      </div>

      <aside className="meal-history-list">
        <h3>Your Meal History</h3>
        {mealHistories.map((h) => (
          <MealHistoryCard
            key={h.id}
            id={h.id}
            name={h.name}
            imageUrl={h.image_url}
            category={h.category}
            createdAt={h.created_at}
            favorite={h.favorite}
            rating={h.rating}
          />
        ))}
      </aside>
    </div>
  );
}
