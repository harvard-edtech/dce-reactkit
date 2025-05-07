/**
 * Tag filter state
 * @author Yuen Ler Chow
 */
type TagFilterState = {
  [k: string]: boolean // tag => true if in the list of tags to show
};

export default TagFilterState;
