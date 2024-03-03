
// We need to specify how the frontend and the backend will communicate
// This enables us to do data validation
// The following defines how a space entry looks like
export interface SpaceEntry {
    id: string,
    location: string,
    name: string,
    photoUrl?: string
}