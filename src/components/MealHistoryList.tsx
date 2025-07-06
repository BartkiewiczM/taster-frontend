import MealHistoryCard from "./MealHistoryCard";

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

export default function MealHistoryList({ histories }: { histories: MealHistory[] }) {
  return (
    <aside className="meal-history-list">
      <h3>Your Meal History</h3>
      {histories.map((h) => (
        <MealHistoryCard
          key={h.id}
          id={h.id}
          meal_id={h.meal_id}
          name={h.name}
          imageUrl={h.image_url}
          category={h.category}
          createdAt={h.created_at}
          favorite={h.favorite}
          rating={h.rating}
        />
      ))}
    </aside>
  );
}
