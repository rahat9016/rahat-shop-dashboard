export const renderCategory = (categories, option = []) => {
  for (let category of categories) {
    option.push({
      value: category._id,
      name: category.title,
      categoryImg: category.categoryImg,
      parentId: category.parentId,
    });
    if (category.children.length > 0) {
      renderCategory(category.children, option);
    }
  }
  return option;
};
