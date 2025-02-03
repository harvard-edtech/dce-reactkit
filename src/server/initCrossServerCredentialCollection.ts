/**
 * Initialize a cross-server credential collection given the dce-mango Collection class
 * @author Gabe Abrams
 * @param Collection the Collection class from dce-mango
 * @returns initialized logCollection
 */
const initCrossServerCredentialCollection = (Collection: any) => {
  return new Collection(
    'CrossServerCredential',
    {
      uniqueIndexKey: 'key',
    },
  );
};

export default initCrossServerCredentialCollection;
