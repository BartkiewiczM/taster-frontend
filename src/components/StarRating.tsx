import "./StarRating.css";

interface StarRatingProps {
  rating: number;
  onRate: (newRating: number) => void;
}

export default function StarRating({ rating, onRate }: StarRatingProps) {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = i + 1;
        return (
          <button
            key={star}
            className={star <= rating ? "star selected" : "star"}
            onClick={() => onRate(star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
