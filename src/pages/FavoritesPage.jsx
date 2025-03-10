import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

// Component for displaying favorite recipes
const FavoritesPage = () => {
    // Retrieve favorites from local storage or set to an empty array if none exist
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return (
        <div className='bg-[#faf9fb] flex-1 p-10 min-h-screen'>
            <div className='max-w-screen-lg mx-auto'>
                <p className='font-bold text-3xl md:text-5xl my-4'>My Favorites</p>

                {/* Display an image if there are no favorite recipes */}
                {favorites.length === 0 && (
                    <div className='h-[80vh] flex flex-col items-center gap-4'>
                        <img src='/404.svg' className='h-3/4' alt='404 svg' />
                    </div>
                )}

                {/* Display grid of favorite recipes if there are any */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {favorites.map((recipe) => (
                        <RecipeCard key={recipe.label} recipe={recipe} {...getRandomColor()} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
