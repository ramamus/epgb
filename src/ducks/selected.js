export const SELECT_RESOURCE = "SELECT_RESOURCE";

export const initialState = {
  PLAYER: null,
  EVENT: null,
  SCHEDULE: null,
  MENTOR: null
};

export function selectResource(resourceType, id) {
  return {
    type: SELECT_RESOURCE,
    resourceType,
    id
  };
}

export default function reducer(state = initialState, action) {
  const { type, resourceType, id } = action;
  switch (type) {
    case SELECT_RESOURCE:
      return { ...state, [resourceType]: id };
    default:
      return state;
  }
}
