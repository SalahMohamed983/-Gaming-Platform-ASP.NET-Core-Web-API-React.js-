export default function SearchResults({ results, isLoading, onClose }) {
  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg max-h-96 overflow-y-auto">
      {results.map((game) => (
        <div
          key={game.id}
          className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <img
            src={game.images[0]?.imageUrl || "/default-game.jpg"}
            alt={game.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <span className="font-semibold text-white">{game.name}</span>
        </div>
      ))}
    </div>
  );
}
