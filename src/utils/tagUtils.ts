export const addTagToList = (tags: string[], tag: string): string[] => {
    if (!tags.includes(tag)) {
      return [...tags, tag];
    }
    return tags;
  };
  
  export const removeTagFromList = (tags: string[], tagToRemove: string): string[] => {
    return tags.filter(tag => tag !== tagToRemove);
  };
  