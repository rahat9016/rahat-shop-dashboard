export const renderCategory = (categories, option = []) => {
  // console.log(categories);
  for (let category of categories) {
    option.push({
      id: category._id,
      title: category.title,
      categoryImg: category.categoryImg,
      parentId: category.parentId,
      children: category.children.length > 0 ? true : false,
    });
    if (category.children.length > 0) {
      renderCategory(category.children, option);
    }
  }
  return option;
};
