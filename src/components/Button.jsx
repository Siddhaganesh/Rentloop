// components/Button.jsx
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold shadow-md transition-colors
        bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
        ${className}`}
    >
      {children}
    </button>
  );
}
