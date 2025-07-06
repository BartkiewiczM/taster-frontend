import "./MealHistoryCard.css";

interface MealHistoryCardProps {
  name: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  favorite: boolean;
  rating?: number;
}

export default function MealHistoryCard({
  name,
  imageUrl,
  category,
  createdAt,
  favorite,
  rating,
}: MealHistoryCardProps) {
  return (
    <div className="meal-history-card">
      <img src={imageUrl} alt={name} className="meal-history-image" />
      <div className="meal-history-content">
        <h4>{name}</h4>
        <p className="meal-category">{category}</p>
        <p className="meal-date">{new Date(createdAt).toLocaleString()}</p>
        <p className="meal-fav">{favorite ? "❤️ Favourite" : ""}</p>
        {rating !== undefined && <p className="meal-rating">Rating: {rating}</p>}
      </div>
    </div>
  );
}
