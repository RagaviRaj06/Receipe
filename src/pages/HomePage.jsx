import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";

// Fetching environment variables for API credentials
const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;
const USER_ID = import.meta.env.VITE_USER_ID;

const HomePage = () => {
    // State to hold recipes and loading status
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch recipes based on search query
    const fetchRecipes = async (searchQuery) => {
        setLoading(true);
        setRecipes([]);
        try {
            const res = await fetch(
                `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}`,
                {
                    headers: {
                        'Edamam-Account-User': USER_ID,
                    }
                }
            );

            const data = await res.json();
            console.log('Data:', data);

            if (data.hits && Array.isArray(data.hits)) {
                setRecipes(data.hits);
            } else {
                console.warn('No recipes found');
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch default recipes on initial render
    useEffect(() => {
        fetchRecipes("chicken");
    }, []);

    // Handler for search form submission
    const handleSearchRecipe = (e) => {
        e.preventDefault();
        fetchRecipes(e.target[0].value);
    };

    return (
        <div className='bg-[#faf9fb] p-10 flex-1'>
            <div className='max-w-screen-lg mx-auto'>
                {/* Search form */}
                <form onSubmit={handleSearchRecipe}>
                    <label className='input shadow-md flex items-center gap-2'>
                        <Search size={"24"} />
                        <input
                            type='text'
                            className='text-sm md:text-md grow'
                            placeholder='What do you want to cook today?'
                        />
                    </label>
                </form>

                {/* Heading for recommended recipes */}
                <h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommended Recipes</h1>
                <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular choices</p>

                {/* Displaying recipes or skeleton loaders */}
                <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {!loading && recipes && recipes.map(({ recipe }, index) => (
                        <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
                    ))}

                    {loading &&
                        [...Array(9)].map((_, index) => (
                            <div key={index} className='flex flex-col gap-4 w-full'>
                                <div className='skeleton h-32 w-full'></div>
                                <div className='flex justify-between'>
                                    <div className='skeleton h-4 w-28'></div>
                                    <div className='skeleton h-4 w-24'></div>
                                </div>
                                <div className='skeleton h-4 w-1/2'></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
