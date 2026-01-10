export const formatCategory = (category) => {
    if (!category) return "";
    const decoded = decodeURIComponent(category);
    return category.toString().replace(/-/g, ' ');
};