/**
 * Initialize a log collection given the dce-mango Collection class
 * @author Gabe Abrams
 * @param Collection the Collection class from dce-mango
 * @returns initialized logCollection
 */
const initLogCollection = (Collection: any) => {
  return new Collection(
    'Log',
    {
      uniqueIndexKey: 'id',
      indexKeys: [
        'courseId',
        'category',
        'subcategory',
        'tags',
      ],
    },
  );
};

export default initLogCollection;
