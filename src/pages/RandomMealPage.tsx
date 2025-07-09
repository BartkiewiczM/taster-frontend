import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomMealSection from "../components/RandomMealSection";
import MealHistoryList from "../components/MealHistoryList";
import UserPrerenences from "../components/UserPrerenences";
import { useAuth } from "../AuthContext";
import { fetchWithAuth } from "../api/fetchWithAuth";
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
  const { token, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [mealHistories, setMealHistories] = useState<MealHistory[]>([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  async function getMealHistories() {
    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/meal_histories`,
        {},
        logout
      );

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
      <div className="user-preferences-header">
        <h1>Random Meal Generator</h1>
        <UserPrerenences />
      </div>

      <div className="content-sections">
        <RandomMealSection onNewMeal={getMealHistories} />
        <MealHistoryList histories={mealHistories} />
      </div>
    </div>
  );
}
