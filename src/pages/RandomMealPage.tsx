import { useEffect, useState } from "react";
import RandomMealSection from "../components/RandomMealSection";
import MealHistoryList from "../components/MealHistoryList";
import { useAuth } from "../AuthContext";
import "./RandomMealPage.css";

interface MealHistory {
  id: number;
  meal_id: string;
  name: string;
  category: string;
  image_url: string;
  created_at: string;
  favorite: boolean;
  rating?: number;
}

export default function RandomMealPage() {
  const { token } = useAuth();
  const [mealHistories, setMealHistories] = useState<MealHistory[]>([]);

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
      <RandomMealSection onNewMeal={getMealHistories} />
      <MealHistoryList histories={mealHistories} />
    </div>
  );
}
