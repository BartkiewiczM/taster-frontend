interface Meal {
  id: string;
  name: string;
  image_url: string;
  ingredients: string[];
  recipe: string;
}

export default function MealDetails({ meal }: { meal: Meal }) {
  return (
    <div className="meal-details">
      <h3>{meal.name}</h3>
      <img src={meal.image_url} alt={meal.name} />

      <h4>Ingredients:</h4>
      <ul>
        {meal.ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>

      <h4>Recipe:</h4>
      <p>{meal.recipe}</p>
    </div>
  );
}
