import { useState } from "react";
import MealDetails from "./MealDetails";
import MealNotFoundCard from "./MealNotFoundCard";
import { useAuth } from "../AuthContext";

interface Meal {
  id: string;
  name: string;
  image_url: string;
  ingredients: string[];
  recipe: string;
}

interface RandomMealSectionProps {
  onNewMeal: () => void;
}

const CATEGORIES = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];

export default function RandomMealSection({ onNewMeal }: RandomMealSectionProps) {
  const { token } = useAuth();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  async function getRandomMeal() {
    setLoading(true);
    setMeal(null);

    try {
      const url = new URL(`${import.meta.env.VITE_API_URL}/meals/random`);
      if (selectedCategory) {
        url.searchParams.append("category", selectedCategory);
      }

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        setMeal(null);
      } else if (!res.ok) {
        alert("Failed to fetch meal");
      } else {
        const data = await res.json();
        setMeal(data);
      }

      onNewMeal();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="random-meal">
      <h2>Random Meal</h2>

      <div className="meal-controls">
        <label htmlFor="category-select">Choose category:</label>

        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Any</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={getRandomMeal} disabled={loading}>
          {loading ? "Loading..." : "Get Random Meal"}
        </button>
      </div>

      {meal ? (
        <MealDetails meal={meal} />
      ) : !loading && selectedCategory ? (
        <MealNotFoundCard />
      ) : null}
    </div>
  );
}
