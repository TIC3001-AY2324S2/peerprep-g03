
export const preSelectCheckbox = (questions, categories, setSelectedCategories) => {
    const defaultCategories = questions.categories.split(', ').map(label => categories.find(category => category.label.toLowerCase() === label.toLowerCase()));
    setSelectedCategories(defaultCategories.filter(x => x != undefined));
};